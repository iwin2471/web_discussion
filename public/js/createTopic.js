$("#submit")
  .off("click")
  .on("click", async function() {
    var code = $("#code").val();
    var yn = $("#yn").is(":checked");
    var untill = $("#until").val();
    var description = $("textarea[name='descript2']").val();
    var sub_description = $("textarea[name='descript1']").val();
    var personnel = $("#personnel").val();
    if (
      code == "" ||
      untill == "" ||
      description == "" ||
      sub_description == ""
    ) {
      alert("모든칸을 입력했는지 다시한번 확인해주세요");
    }

    if (!yn) alert("약관에 동의해주세요");
    else {
      var result = await axios.post("/discuss", {
        title: code,
        expire_date: untill,
        description: description,
        sub_description: sub_description,
        person_limitation: personnel,
        agreement: chan
      });
      if (result.status == 200) location.href = "/";
      else alert(result.body.message);
    }
  });
