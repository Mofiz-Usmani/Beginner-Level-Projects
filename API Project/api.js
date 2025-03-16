let p = document.querySelector("#fact");
let btn = document.querySelector("button");
let url = "https://catfact.ninja/fact";

async function getFacts() {
    try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data.fact);
        p.innerText = data.fact;
    }catch(err) {
        console.log("error : ", err);
    }
}

btn.addEventListener('click', () => {
    getFacts();
});
