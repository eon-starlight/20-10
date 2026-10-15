const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestGet(context) {
  const env = context.env;
  const d1 = env.DB && typeof env.DB.prepare === "function" ? env.DB : null;
  const kv = env.WISHES_KV || (env.DB && typeof env.DB.get === "function" ? env.DB : null);

  if (!d1 && !kv) {
    return new Response(
      JSON.stringify([]),
      {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }

  try {
    if (d1) {
      await d1.prepare(`
        CREATE TABLE IF NOT EXISTS wishes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          author TEXT NOT NULL,
          content TEXT NOT NULL,
          time TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      const { results } = await d1.prepare(
        "SELECT id, author, content, time FROM wishes ORDER BY id DESC LIMIT 100"
      ).all();

      return new Response(JSON.stringify(results || []), {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate"
        }
      });
    }

    if (kv) {
      const data = await kv.get("wishes_list", "json");
      return new Response(JSON.stringify(data || []), {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate"
        }
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify([]),
      {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }
}

export async function onRequestPost(context) {
  const env = context.env;
  const d1 = env.DB && typeof env.DB.prepare === "function" ? env.DB : null;
  const kv = env.WISHES_KV || (env.DB && typeof env.DB.get === "function" ? env.DB : null);

  if (!d1 && !kv) {
    return new Response(
      JSON.stringify({ success: false }),
      {
        status: 503,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }

  try {
    const body = await context.request.json();
    const author = (body.author || "").trim().slice(0, 50);
    const content = (body.content || "").trim().slice(0, 300);
    const time = (body.time || "").trim().slice(0, 80);

    if (!author || !content) {
      return new Response(
        JSON.stringify({ success: false }),
        {
          status: 400,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/json; charset=utf-8"
          }
        }
      );
    }

    if (d1) {
      await d1.prepare(`
        CREATE TABLE IF NOT EXISTS wishes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          author TEXT NOT NULL,
          content TEXT NOT NULL,
          time TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      const insertResult = await d1.prepare(
        "INSERT INTO wishes (author, content, time) VALUES (?, ?, ?)"
      ).bind(author, content, time).run();

      const newId = insertResult.meta?.last_row_id || Date.now();
      const newWish = { id: newId, author, content, time };

      return new Response(
        JSON.stringify({ success: true, wish: newWish }),
        {
          status: 201,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/json; charset=utf-8"
          }
        }
      );
    }

    if (kv) {
      let list = (await kv.get("wishes_list", "json")) || [];
      const newWish = { id: Date.now(), author, content, time };
      list.unshift(newWish);
      if (list.length > 200) list = list.slice(0, 200);
      await kv.put("wishes_list", JSON.stringify(list));

      return new Response(
        JSON.stringify({ success: true, wish: newWish }),
        {
          status: 201,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/json; charset=utf-8"
          }
        }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false }),
      {
        status: 500,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }
}
