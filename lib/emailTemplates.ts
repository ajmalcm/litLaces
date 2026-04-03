const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://lit-laces.vercel.app').replace(/\/$/, '');
// Use the public URL for the logo so server-side templates can reference it directly
const LOGO_URL = `${SITE_URL}/icons/lit_laces.png`;

function baseStyles() {
  return `
    body { margin:0; padding:0; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
  .container { width:100%; background:#f6f7fb; padding:24px 12px; }
  .card { max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 16px rgba(18,24,40,0.06); }
  /* dark header so logo section stands out across email clients */
  .header { padding:20px; text-align:center; background: #0f1724; }
  .header img { display:block; margin:0 auto; max-width:140px; height:auto; }
    .content { padding:24px; color:#0f1724; line-height:1.5; }
    .button { display:inline-block; background:#111827; color:#fff; padding:12px 20px; border-radius:8px; text-decoration:none; }
    .muted { color:#6b7280; font-size:13px; }
    .divider { height:1px; background:#eef2f7; margin:18px 0; }
    @media (max-width:420px){ .content{ padding:18px; } .header img{ max-width:120px; height:auto } }
  `;
}

export function welcomeTemplate(name: string) {
  const preheader = `Welcome to Lit Laces — we saved your first look at fresh sneakers.`;
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${baseStyles()}</style>
  </head>
  <body>
    <span style="display:none;max-height:0px;overflow:hidden;">${preheader}</span>
    <div class="container">
      <div class="card">
        <div class="header">
          <a href="${SITE_URL}"><img src="${LOGO_URL}" alt="Lit Laces" width="120" style="display:block;margin:0 auto;"/></a>
        </div>
        <div class="content">
          <h1 style="margin:0 0 8px; font-size:20px">Welcome, ${name} 👋</h1>
          <p class="muted">Thanks for joining Lit Laces. We're excited to help you find the freshest sneakers and drops.</p>

          <div style="margin-top:18px;text-align:center">
            <a class="button" href="${SITE_URL}">Start shopping</a>
          </div>

          <div class="divider"></div>

          <p style="margin:0">A few quick tips to get started:</p>
          <ul style="margin-top:8px;color:#374151">
            <li>Browse curated collections on our homepage.</li>
            <li>Add favorites to your wishlist for quick access.</li>
            <li>Use code <strong>WELCOME10</strong> for 10% off your first order (optional).</li>
          </ul>

          <p style="margin-top:18px; font-size:13px" class="muted">Questions? Reply to this email and our support team will help.</p>
          <p style="margin-top:16px; font-size:13px; color:#9ca3af">— The Lit Laces Team</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

export function orderConfirmationTemplate(order: any) {
  const itemsHtml = (order.orderItems || [])
    .map((it: any) => `
      <tr>
        <td style="padding:8px 0">${it.name}</td>
        <td style="padding:8px 0; text-align:center">${it.quantity}</td>
        <td style="padding:8px 0; text-align:right">₹${it.price}</td>
      </tr>
    `)
    .join('');

  const preheader = `Order ${order._id} confirmed — we'll notify you when it ships.`;
  const viewOrderUrl = `${SITE_URL}/orders/${order._id}`;

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${baseStyles()}</style>
  </head>
  <body>
    <span style="display:none;max-height:0px;overflow:hidden;">${preheader}</span>
    <div class="container">
      <div class="card">
        <div class="header"><a href="${SITE_URL}"><img src="${LOGO_URL}" alt="Lit Laces" width="120"/></a></div>
        <div class="content">
          <h2 style="margin:0 0 6px">Order confirmed 🎉</h2>
          <p class="muted">Order ID: <strong>${order._id}</strong></p>
          <p style="margin-top:6px">Hi ${order.shippingInfo?.firstName || ''}, thanks — we've received your order and are preparing it for shipment.</p>

          <div style="margin-top:12px">
            <table style="width:100%; border-collapse:collapse">
              <thead>
                <tr style="border-bottom:1px solid #eef2f7">
                  <th style="text-align:left; padding-bottom:8px">Item</th>
                  <th style="text-align:center; padding-bottom:8px">Qty</th>
                  <th style="text-align:right; padding-bottom:8px">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center">
            <div style="color:#374151">Subtotal</div>
            <div style="font-weight:600">₹${order.itemsPrice || order.totalAmount}</div>
          </div>
          <div style="margin-top:6px; display:flex; justify-content:space-between; align-items:center">
            <div class="muted">Shipping</div>
            <div class="muted">₹${order.shippingPrice || 0}</div>
          </div>
          <div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center; font-size:16px">
            <div style="font-weight:700">Total</div>
            <div style="font-weight:700">₹${order.totalAmount}</div>
          </div>

          <div style="margin-top:18px; text-align:center">
            <a class="button" href="${viewOrderUrl}">View your order</a>
          </div>

          <div class="divider"></div>
          <p class="muted" style="margin:0">Shipping to:</p>
          <p style="margin:6px 0 0">${order.shippingInfo?.address || ''} ${order.shippingInfo?.city || ''} ${order.shippingInfo?.postalCode || ''}</p>

          <p style="margin-top:18px; font-size:13px" class="muted">If you need help, reply to this email or contact support at <a href="mailto:support@${SITE_URL.replace(/^https?:\/\//, '')}">support@${SITE_URL.replace(/^https?:\/\//, '')}</a>.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

export function orderStatusUpdateTemplate(order: any, status: string) {
  const preheader = `Update: your order ${order._id} is now ${status}.`;
  const trackUrl = `${SITE_URL}/orders/${order._id}`;

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${baseStyles()}</style>
  </head>
  <body>
    <span style="display:none;max-height:0px;overflow:hidden;">${preheader}</span>
    <div class="container">
      <div class="card">
        <div class="header"><a href="${SITE_URL}"><img src="${LOGO_URL}" alt="Lit Laces" width="120"/></a></div>
        <div class="content">
          <h2 style="margin:0 0 6px">Order update</h2>
          <p style="margin:0">Your order <strong>#${order._id}</strong> status has changed to:</p>
          <p style="margin-top:10px; font-size:18px; font-weight:700; color:#111827">${status}</p>

          <div style="margin-top:14px; text-align:center">
            <a class="button" href="${trackUrl}">Track your order</a>
          </div>

          <div class="divider"></div>
          <p class="muted">If you didn't expect this update or have any questions, reply to this email and our support team will help.</p>
          <p style="margin-top:16px; font-size:13px; color:#9ca3af">— The Lit Laces Team</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

export function adminOrderNotificationTemplate(order: any, user?: any) {
  const preheader = `New order ${order._id} placed — ${order.orderItems?.length || 0} items`;
  const adminOrderUrl = `${SITE_URL}/admin/allOrders/${order._id}`;
  const itemsHtml = (order.orderItems || [])
    .map((it: any) => `
      <tr>
        <td style="padding:6px 0">${it.name}</td>
        <td style="padding:6px 0; text-align:center">${it.quantity}</td>
        <td style="padding:6px 0; text-align:right">₹${it.price}</td>
      </tr>
    `)
    .join('');

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${baseStyles()}</style>
  </head>
  <body>
    <span style="display:none;max-height:0px;overflow:hidden;">${preheader}</span>
    <div class="container">
      <div class="card">
        <div class="header"><a href="${SITE_URL}"><img src="${LOGO_URL}" alt="Lit Laces" width="120"/></a></div>
        <div class="content">
          <h2 style="margin:0 0 8px">New order received</h2>
          <p style="margin:0">Order ID: <strong>${order._id}</strong></p>
          <p style="margin-top:6px">Customer: <strong>${user?.name || order.shippingInfo?.firstName || 'Guest'}</strong> — ${order.shippingInfo?.email || 'no-email'}</p>

          <div style="margin-top:12px">
            <table style="width:100%; border-collapse:collapse">
              <thead>
                <tr style="border-bottom:1px solid #eef2f7">
                  <th style="text-align:left; padding-bottom:8px">Item</th>
                  <th style="text-align:center; padding-bottom:8px">Qty</th>
                  <th style="text-align:right; padding-bottom:8px">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center">
            <div style="color:#374151">Total</div>
            <div style="font-weight:700">₹${order.totalAmount}</div>
          </div>

          <div style="margin-top:16px; text-align:center">
            <a class="button" href="${adminOrderUrl}">Open in admin</a>
          </div>

          <div class="divider"></div>
          <p class="muted">Shipping to: ${order.shippingInfo?.address || ''} ${order.shippingInfo?.city || ''} ${order.shippingInfo?.postalCode || ''}</p>
          <p style="margin-top:10px; font-size:13px" class="muted">Order created at: ${new Date(order.createdAt || Date.now()).toLocaleString()}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}
