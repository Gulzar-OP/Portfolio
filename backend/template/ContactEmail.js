const contactEmailTemplate = ({ name, email, subject, message }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Message</title>
      </head>

      <body style="
        margin: 0;
        padding: 40px 20px;
        background-color: #f4f4f5;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 650px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e4e4e7;
        ">

          <!-- Header -->
          <div style="
            background: #2563eb;
            padding: 30px;
            color: white;
          ">

            <h1 style="
              margin: 0;
              font-size: 26px;
            ">
              New Contact Message
            </h1>

            <p style="
              margin: 8px 0 0;
              font-size: 14px;
              color: #dbeafe;
            ">
              Someone contacted you through your portfolio.
            </p>

          </div>


          <!-- Content -->
          <div style="padding: 30px;">

            <!-- Name -->
            <div style="margin-bottom: 22px;">

              <div style="
                font-size: 12px;
                font-weight: bold;
                color: #71717a;
                text-transform: uppercase;
                margin-bottom: 6px;
              ">
                Name
              </div>

              <div style="
                font-size: 16px;
                color: #18181b;
              ">
                ${name}
              </div>

            </div>


            <!-- Email -->
            <div style="margin-bottom: 22px;">

              <div style="
                font-size: 12px;
                font-weight: bold;
                color: #71717a;
                text-transform: uppercase;
                margin-bottom: 6px;
              ">
                Email
              </div>

              <a
                href="mailto:${email}"
                style="
                  font-size: 16px;
                  color: #2563eb;
                  text-decoration: none;
                "
              >
                ${email}
              </a>

            </div>


            <!-- Subject -->
            <div style="margin-bottom: 25px;">

              <div style="
                font-size: 12px;
                font-weight: bold;
                color: #71717a;
                text-transform: uppercase;
                margin-bottom: 6px;
              ">
                Subject
              </div>

              <div style="
                font-size: 16px;
                color: #18181b;
              ">
                ${subject || "No subject"}
              </div>

            </div>


            <!-- Divider -->
            <div style="
              height: 1px;
              background-color: #e4e4e7;
              margin: 25px 0;
            "></div>


            <!-- Message -->
            <div>

              <div style="
                font-size: 12px;
                font-weight: bold;
                color: #71717a;
                text-transform: uppercase;
                margin-bottom: 10px;
              ">
                Message
              </div>

              <div style="
                background-color: #f4f4f5;
                border-left: 4px solid #2563eb;
                padding: 18px;
                border-radius: 0 8px 8px 0;
                color: #3f3f46;
                font-size: 15px;
                line-height: 1.7;
              ">
                ${message}
              </div>

            </div>

          </div>


          <!-- Footer -->
          <div style="
            background-color: #fafafa;
            border-top: 1px solid #e4e4e7;
            padding: 20px 30px;
            text-align: center;
          ">

            <p style="
              margin: 0;
              font-size: 12px;
              color: #71717a;
            ">
              This email was sent from your portfolio contact form.
            </p>

          </div>

        </div>

      </body>
    </html>
  `;
};

export default contactEmailTemplate;