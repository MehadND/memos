import { AspectRatio, Badge, Card, CardContent, Typography, useColorScheme } from "@mui/joy";
import MuiLink from "@mui/joy/Link";
import { useEffect, useState } from "react";

interface Props {
  url: string;
  text?: string;
}

const isYouTubeVideoUrl = (url: string) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const isYouTubeShortsUrl = (url: string) => {
  return url.includes("youtube.com/shorts");
};

const Link: React.FC<Props> = ({ text, url }: Props) => {
  //states for youtube video
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  const [creator, setCreator] = useState<string | undefined>(undefined);
  //const [provider, setProvider] = useState<string | undefined>(undefined);

  //states for youtube short
  const [shortsTitle, setShortsTitle] = useState<string | undefined>(undefined);
  const [shortsThumbnail, setShortsThumbnail] = useState<string | undefined>(undefined);
  const [shortsCreator, setShortsCreator] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isYouTubeShortsUrl(url)) {
          const shortsVideoId = url.split("shorts/").pop();
          const embedUrl = `https://www.youtube.com/embed/${shortsVideoId}`;
          const response = await fetch(`https://noembed.com/embed?dataType=json&url=${embedUrl}`);
          console.log(response);
          if (response) {
            const data = await response.json();
            setShortsTitle(data.title);
            setShortsThumbnail(data.thumbnail_url);
            setShortsCreator(data.author_name);
          }
        }
        if (isYouTubeVideoUrl(url)) {
          const response = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`);
          if (response) {
            const data = await response.json();
            setTitle(data.title);
            setThumbnail(data.thumbnail_url);
            setCreator(data.author_name);
          }
        }
      } catch (error) {
        console.error("Error fetching video info:", error);
      }
    };

    fetchData();
  }, [url]);

  const { mode, systemMode } = useColorScheme();

  const renderLink = () => {
    if (isYouTubeShortsUrl(url)) {
      return (
        <>
          {/* For small screen */}
          <div className="flex lg:hidden">
            <Card
              variant="soft"
              orientation="vertical"
              sx={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <AspectRatio ratio={"16/9"} sx={{ width: "100%" }} objectFit={"cover"}>
                <img src={shortsThumbnail} alt={shortsTitle} />
              </AspectRatio>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography level="title-lg" id="card-description">
                  {shortsTitle && (
                    <div className="">
                      <h4 className=" text-lg font-semibold tracking-tight">{shortsTitle}</h4>
                    </div>
                  )}
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                  <p className="mt-4">{creator}</p>
                </Typography>
                <MuiLink
                  overlay
                  underline={"none"}
                  href={url}
                  target="_black"
                  rel="noopener noreferrer"
                  className="absolute px-4 py-4 top-0 right-0"
                />
              </CardContent>
            </Card>
          </div>

          {/* For large screens */}
          <div className="hidden lg:flex mt-4 z-0">
            <Badge sx={{ width: "100%" }} color="danger" badgeContent={"short"} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
              <Card
                variant="soft"
                orientation="horizontal"
                sx={{
                  width: "100%",
                  //backgroundColor: "rgba(0, 0, 0, 0.0)",
                  border: "1px solid rgba(0, 0, 0, 0.0)",
                  transition: "ease-in-out",
                  transitionDuration: "0.25s",
                  "&:hover": {
                    //backgroundColor: "rgba(0, 0, 0, 0.5)",
                    border: `1px solid ${mode === "dark" || systemMode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 1)"}`, // Adjust the colors based on your theme
                  },
                }}
              >
                <AspectRatio ratio={"16/9"} sx={{ width: "25%" }} objectFit={"cover"}>
                  <img src={shortsThumbnail} alt={shortsTitle} />
                </AspectRatio>
                <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography level="title-lg" id="card-description">
                    {shortsTitle && (
                      <div className="">
                        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">{shortsTitle}</h4>
                      </div>
                    )}
                  </Typography>
                  <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                    <p className="mt-4">{shortsCreator}</p>
                  </Typography>
                  <MuiLink
                    overlay
                    underline={"none"}
                    href={url}
                    target="_black"
                    rel="noopener noreferrer"
                    className="absolute px-4 py-4 top-0 right-0"
                  />
                </CardContent>
              </Card>
            </Badge>
          </div>
        </>
      );
    }
    if (isYouTubeVideoUrl(url)) {
      return (
        <>
          {/* For small screen */}
          <div className="flex lg:hidden">
            <Card
              variant="soft"
              orientation="vertical"
              sx={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <AspectRatio ratio={"16/9"} sx={{ width: "100%" }} objectFit={"cover"}>
                <img src={thumbnail} alt={title} />
              </AspectRatio>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography level="title-lg" id="card-description">
                  {title && (
                    <div className="">
                      <h4 className=" text-lg font-semibold tracking-tight">{title}</h4>
                    </div>
                  )}
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                  <p className="mt-4">{creator}</p>
                </Typography>
                <MuiLink
                  overlay
                  underline={"none"}
                  href={url}
                  target="_black"
                  rel="noopener noreferrer"
                  className="absolute px-4 py-4 top-0 right-0"
                />
              </CardContent>
            </Card>
          </div>

          {/* For large screens */}
          <div className="hidden lg:flex mt-4 z-0 relative">
            <Badge sx={{ width: "100%" }} color="danger" badgeContent={"video"} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
              <Card
                variant="soft"
                orientation="horizontal"
                sx={{
                  width: "100%",
                  //backgroundColor: "rgba(0, 0, 0, 0.0)",
                  border: "1px solid rgba(0, 0, 0, 0.0)",
                  transition: "ease-in-out",
                  transitionDuration: "0.25s",
                  "&:hover": {
                    //backgroundColor: "rgba(0, 0, 0, 0.5)",
                    border: `1px solid ${mode === "dark" || systemMode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 1)"}`, // Adjust the colors based on your theme
                  },
                }}
              >
                <AspectRatio ratio={"16/9"} sx={{ width: "25%" }} objectFit={"cover"}>
                  <img src={thumbnail} alt={title} />
                </AspectRatio>
                <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography level="title-lg" id="card-description">
                    {title && (
                      <div className="">
                        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">{title}</h4>
                      </div>
                    )}
                  </Typography>
                  <Typography level="body-sm" aria-describedby="card-description" mt={1}>
                    <p className="">{creator}</p>
                  </Typography>
                  <MuiLink overlay underline={"none"} href={url} target="_black" rel="noopener noreferrer" />
                </CardContent>
              </Card>
            </Badge>
          </div>
        </>
      );
    }

    // If it's not a recognized video URL, just display a regular link
    return (
      <a
        className="text-blue-600 dark:text-blue-400 cursor-pointer underline break-all hover:opacity-80 decoration-1"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text || url}
      </a>
    );
  };

  return <div>{renderLink()}</div>;
};

export default Link;
