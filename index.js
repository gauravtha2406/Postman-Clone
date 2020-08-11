console.log("hi");
// selecting the id 
let custompara = document.getElementById('custompara');
let json = document.getElementById('json');

let textjson = document.querySelector('.textjson');
textjson.style.display = "none";
let parablocks = document.querySelector('.parablocks');
parablocks.style.display = "none";

json.addEventListener('click', () => {
    textjson.style.display = "block";
    parablocks.style.display = "none";

})

custompara.addEventListener('click', () => {
    parablocks.style.display = "block";
    textjson.style.display = "none";

})
//utility function
function getparablocks(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// add btn (-,+) for content parameter key and value
let count = 0;
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', () => {
    let moreparablocks = document.getElementById('moreparablocks');
    console.log("clicked");
    let string = ` <div class="form-group row">
  <div class="col-sm-3 offset-sm-2">


      <input type="email" class="form-control" id="parametervalue${count + 2}" placeholder="Enter parameter value ${count + 2}">
   </div>
  
     <div class="col-sm-3">
      <input type="text" class="form-control" id="parameterkey${count + 2}" placeholder="Enter parameter key ${count + 2}">
      </div>
      
      <button class="btn btn-danger deletebtn">-</button>
      

  
</div>`

    let blocks = getparablocks(string);
    console.log(blocks);
    moreparablocks.appendChild(blocks);
    

    //for deletion of parameter key and value
    let deletebtn = document.getElementsByClassName('deletebtn');
    for (item of deletebtn) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

    count++;





})

//for submit button

let submit = document.getElementById('submitbtn')
submit.addEventListener('click', () => {

    let url = document.getElementById('url').value;
    let requesttype = document.querySelector("input[name='requesttype']:checked").value;
    let contenttype = document.querySelector("input[name='contenttype']:checked").value;



    if (contenttype == 'custompara') {
        data = {};
        for (let i = 0; i < count + 1; i++) {
            if (document.getElementById('parameterkey' + (i + 1)) != undefined) {

                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parametervalue' + (i + 1)).value;
                data[key] = value;

            }

        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById("textjson-area").value;


    }
    console.log(url);
    console.log(requesttype);
    console.log(contenttype);
    console.log(data);


    if (requesttype == 'GET') {

        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('response-area').value = text;
                document.getElementById('response-prism').innerHTML = text;
                Prism.highlightAll();
            });
        
    }
    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('response-area').value = text;
            // document.getElementById('response-area').innerHTML = text;
            document.getElementById('response-prism').innerHTML = text;
            Prism.highlightAll();

            
        });

    }

})