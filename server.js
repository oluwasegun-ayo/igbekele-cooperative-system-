<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>IGBEKELE OLUWA Cooperative System</title>
  <style>
    body { font-family: Arial, sans-serif; background:#f6f7fb; margin:0; }
    .wrap { max-width: 900px; margin: 60px auto; padding: 24px; }
    .card { background:#fff; border-radius:14px; padding:28px; box-shadow:0 10px 25px rgba(0,0,0,.08); }
    h1 { margin:0 0 10px; font-size: 28px; }
    p { margin: 8px 0; color:#444; }
    .badge { display:inline-block; padding:6px 10px; border-radius:999px; background:#e9fff0; color:#0b7a2a; font-weight:700; }
    .row { display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
    button { padding:10px 14px; border:0; border-radius:10px; cursor:pointer; font-weight:700; }
    .primary { background:#5b5cff; color:#fff; }
    .muted { background:#f0f1f6; }
    code { background:#f0f1f6; padding:2px 6px; border-radius:6px; }
    .small { font-size: 13px; color:#666; margin-top:14px; }
    pre { background:#0b1020; color:#cfe1ff; padding:14px; border-radius:12px; overflow:auto; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>IGBEKELE OLUWA Cooperative System <span class="badge">LIVE ✅</span></h1>
      <p>This is your deployed web page (HTML served by Express).</p>

      <div class="row">
        <button class="primary" onclick="ping()">Test API</button>
        <button class="muted" onclick="location.reload()">Refresh</button>
      </div>

      <p class="small">API test will call <code>/health</code> and show result below.</p>
      <pre id="out">Click “Test API”</pre>
    </div>
  </div>

  <script>
    async function ping() {
      const out = document.getElementById('out');
      out.textContent = "Loading...";
      try {
        const res = await fetch('/health');
        const data = await res.json();
        out.textContent = JSON.stringify(data, null, 2);
      } catch (e) {
        out.textContent = "Error: " + e.message;
      }
    }
  </script>
</body>
</html>
