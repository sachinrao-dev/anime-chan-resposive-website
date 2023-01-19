import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import CircularIndeterminate from "./CircularIndeterminate";
import apiUrls from "../ApiUrls";
import useStyle from "../Style/DashboardStyle";

function ShowMore() {
  const [params] = useSearchParams();
  const page = params.get("page");
  const classes = useStyle();
  const location = useLocation();
  const { title } = location.state;
  const [paginationData, setPaginationData] = useState(null);
  useEffect(() => {
    axios.get(apiUrls.paginationUrl).then((res) => {
      setPaginationData(res.data);
    });
  }, []);
  return (
    <div className={classes.container}>
      {!paginationData ? (
        <CircularIndeterminate />
      ) : (
        <Box className={classes.boxModal}>
          <Masonry className={classes.masonryModal}>
            {paginationData.map((item) => (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {item?.character}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {item.quote.substring(0, 50)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Masonry>
        </Box>
      )}
    </div>
  );
}

export default ShowMore;