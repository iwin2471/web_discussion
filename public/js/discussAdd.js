$(function() {
  var chan_add = $("#chan_add");
  chan_add.click(async function() {
    var id = window.location.pathname.split("/")[3];
    var result = await axios.post(
      "/discuss/chan",
      {
        id: id,
        contents: $("#chan_opinion_write").val()
      },
      {
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      }
    );

    if (result.status == 200) location.reload();
    else alert(result.data.message);
  });
});

$(function() {
  var ban_add = $("#ban_add");
  ban_add.click(async function() {
    var id = window.location.pathname.split("/")[3];
    var result = await axios.post(
      "/discuss/ban",
      {
        id: id,
        contents: $("#ban_opinion_write").val()
      },
      {
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      }
    );
    if (result.status == 200) location.reload();
    else alert(result.data.message);
  });
});

async function commentchan(token) {
  var id = window.location.pathname.split("/")[3];
  var result = await axios.post(
    "/discuss/chan/comment",
    {
      id: id,
      discuss_token: token,
      contents: $("#chan_comment").val()
    },
    {
      validateStatus: function(status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    }
  );
  if (result.status == 200) location.reload();
  else alert(result.data.message);
}

async function commentban(token) {
  var id = window.location.pathname.split("/")[3];
  var result = await axios.post(
    "/discuss/ban/comment",
    {
      id: id,
      discuss_token: token,
      contents: $("#ban_comment").val()
    },
    {
      validateStatus: function(status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    }
  );
  if (result.status == 200) location.reload();
  else alert(result.data.message);
}
