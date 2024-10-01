import validUrl from "valid-url";
import shortid from "shortid";
import URL from "../models/url.js";

//base url for shortened links -----(this should be dynamic in real projects )

const baseUrl = "http://localhost:8080";

export const shortUrl = async (req, res) => {
  const { longUrl } = req.body;

  //validate long URL------------

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ message: "Invalid long URL" });
  }

  //check if the long URL lready exists in the daabasse------

  const existingUrl = await URL.findOne({ longUrl });

  if (existingUrl) {
    return res.status(200).json(existingUrl);
  }

  //create a new short code -------------

  const urlCode = shortid.generate();
  const shortUrl = `${baseUrl}/${urlCode}`;

  //save the new URL mapping in the database -------------------
  const url = new URL({ longUrl, shortUrl, urlCode });
  await url.save();

  res.status(201).json({ longUrl, shortUrl, urlCode });
};

//Redirect to the original URL

export const redirectUrl = async (req, res) => {
  const { urlCode } = req.params;

  try {
    //find the long URL from the urlcode-------

    const url = await URL.findOne({ urlCode });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: "No URL found for this code!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
