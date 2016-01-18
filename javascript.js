var baseUrl = 'http://localhost/Lecture22Ajax/server.php',
	ul = document.getElementById('output');
	
//relative URL	
baseUrl = 'server.php';
request.get(baseUrl, {}, successHome);

var dataToBeRemoved = [],
counter = 0; 
//is this how it is done?????? And there is no way to remove from session so I use localstorage

function successHome(data){

	for(var person in data){
		
		localStorage.setItem(data[person].name, data[person].name + data[person].age + data[person].job);
		dataToBeRemoved.push(data[person].name);
		setTimeout(function(){
			localStorage.removeItem(dataToBeRemoved[counter++]);
		},30000);
		
		var li = document.createElement('li'),
		a = document.createElement('a');
		a.href = "";
		a.innerHTML += data[person].name;
		
		li.appendChild(a);
		li.className = data[person].name;
		li.innerHTML += "<img src='" + data[person].imageUrl + "' />";
		ul.appendChild(li);
	}
}

ul.addEventListener("click", function(ev){
	if(ev.target.tagName == 'A'){
		ev.preventDefault();
		hide();
		
		request.get(baseUrl, {name: ev.target.innerHTML}, successPerson);
	}
        
});

function successPerson(data){
	var li = document.getElementsByClassName(data.name)[0];
	
	if(li.innerHTML.indexOf("hide") == -1){
		var wrapper = document.createElement('li'),
			dateOfBirth = document.createElement('div'),
			gender = document.createElement('div'),
			job = document.createElement('div');
		wrapper.className  = "show";
		
		dateOfBirth.innerHTML = data.dateOfBirth;
		gender.innerHTML = data.gender;
		job.innerHTML = data.job;
		
		wrapper.appendChild(job);
		wrapper.appendChild(gender);
		wrapper.appendChild(dateOfBirth);
		li.appendChild(wrapper);
	} else {
		li.getElementsByClassName("hide")[0].className = "show";
	}
	
}

function hide(){
	var additionalInfo = document.getElementsByClassName("show");
		for(var info in additionalInfo){
			additionalInfo[info].className = "hide"; 
		}
}