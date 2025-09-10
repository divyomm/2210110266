const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkczMwOEBzbnUuZWR1LmluIiwiZXhwIjoxNzU3NDk4MTQ5LCJpYXQiOjE3NTc0OTcyNDksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI0ZThmN2EwMi1mZmFjLTQzZjMtYWIwYy03ODAyM2JkZDc2NGIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJkaXZ5b20gc2luZ2giLCJzdWIiOiJhNDRhMzJkYi1mYTNmLTQ2MjAtOThkMS05MGVmZjFlOGFmNTkifSwiZW1haWwiOiJkczMwOEBzbnUuZWR1LmluIiwibmFtZSI6ImRpdnlvbSBzaW5naCIsInJvbGxObyI6IjIyMTAxMTAyNjYiLCJhY2Nlc3NDb2RlIjoiWHZBRGZzIiwiY2xpZW50SUQiOiJhNDRhMzJkYi1mYTNmLTQ2MjAtOThkMS05MGVmZjFlOGFmNTkiLCJjbGllbnRTZWNyZXQiOiJUYWZWR0hyYkZLUFpwZEpaIn0.aSyiZNwR8zOj6fDkmdBuL3jr54rz0RuxMKZMIEpatmI";
const logApiUrl = "http://20.244.56.144/evaluation-service/logs";

const Log = async (stack, level, apackage, message) => {
  try {
    const response = await fetch(logApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: apackage,
        message: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send log:", errorData);
    }
  } catch (error) {
    console.error("Error sending log:", error);
  }
};

export { Log };
