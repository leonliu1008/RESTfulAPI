async function getData() {
  let obj = await fetch("http://localhost:3000/students");
  let data = await obj.json();
  console.log(data);
}
getData();
