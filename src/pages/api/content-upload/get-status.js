export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { contenturl } = req.body;

      // Split the URL by slashes and extract the second last part
      const parts = contenturl.split("/");
      const doId = parts.length > 2 ? parts[parts.length - 2] : null;
      if (doId) {
        const baseURL = process.env.BASE_URL;
        const authApiToken = process.env.AUTH_API_TOKEN;
        const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

        const axios = require("axios");

        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${baseURL}/api/content/v1/read/${doId}?fields=artifactUrl`,
          headers: {
            tenantid: tenantId,
            Authorization: `Bearer ${authApiToken}`,
          },
        };

        await axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response?.data?.result?.content?.artifactUrl != null) {
              res.status(200).json({ doId, success: true });
            } else {
              res.status(200).json({ doId, success: false });
            }
          })
          .catch((error) => {
            res.status(200).json({ doId, success: false });
          });
      } else {
        res.status(200).json({ doId, success: false });
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
