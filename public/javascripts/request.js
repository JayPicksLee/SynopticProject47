
document.getElementById('donation').addEventListener('submit', function(event) {
    event.preventDefault();
    const forename = document.getElementById('forename').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const amount = document.getElementById('donation').value;

    console.log(`Name: ${forename} ${surname}, Email: ${email}, Subject: ${mobile}, Message: ${amount}`);
    let form = document.querySelector(".payment");
    let form2 = document.querySelector(".form2")
    form.classList.toggle("showForm");
    form2.classList.toggle("showForm2")
});

document.getElementById('payment').addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNum = document.getElementById('cardNum').value;
    const cardName = document.getElementById('cardName').value;
    const date = document.getElementById('exdate').value;
    const code = document.getElementById('code').value;
   

    console.log(`Name: ${cardName}, Email: ${cardNum}, Subject: ${date}, Message: ${code}`);
    alert("Your donation has been accepted. Thank you for donating");
    let form3 = document.querySelector(".payment");
    let form4 = document.querySelector(".form2")
    form3.classList.toggle("showForm");
    form4.classList.toggle("showForm2")
});
