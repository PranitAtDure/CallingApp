import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

function PhoneList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      setList(contacts);
    } else {
      console.log("No contacts found in localStorage.");
    }
  }, []);

  useEffect(() => {
    // setList(data);
  }, []);

  const navigate = useNavigate();

  function onSuccess(result) {
    console.log("Success:" + result);
  }

  function onError(result) {
    console.log("Error:" + result);
  }

  const handleCall = (number) => {
    if (window.plugins && window.plugins.CallNumber) {
      window.plugins.CallNumber.callNumber(
        (success) => {
          console.log("Call Success", success);
        },
        (error) => {
          console.error("Call Error", error);
        },
        number,
        true // Pass `true` to bypass the app chooser (optional)
      );
    } else {
      console.error("CallNumber plugin is not available.");
    }
  };

  return (
    <div>
      <div className="backIcon">
        <ArrowBackIosIcon onClick={() => navigate("/addcontact")} />
      </div>
      <div className="lisetContainer">
        {list &&
          list.map((item) => {
            return (
              <>
                <Box sx={{ minWidth: 275, padding: "10px" }}>
                  <Card variant="outlined">
                    <CardContent className="boxContainer">
                      <Typography
                        variant=""
                        component="div"
                        className="phoneList"
                      >
                        <FontAwesomeIcon
                          icon="fa-solid fa-phone"
                          className="phoneIcon"
                        />
                        <LocalPhoneIcon onClick={() => handleCall()} />
                        <div style={{ marginLeft: "10px" }}>
                          <div>{item.name}</div>
                          <div style={{ fontSize: "10px" }}>
                            +91 {item.phone}
                          </div>
                        </div>
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default PhoneList;
