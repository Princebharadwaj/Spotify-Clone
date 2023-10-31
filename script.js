/*
    Project Name :- clone of Spotify
    Author Name :- Prince Bharadwaj
    version :- 1.0.0
    Note :- NOT responsive Website
*/

//Songlist that is dynamically added in HTML
let songItems = [
    {coverphoto: 'Photos/1.jpg',songname:'52 gaj ka daman ',filepath:'Songs/52Gajkadaman.mp3'},
    {coverphoto: 'Photos/2.jpg',songname:'Abhi toh party shuru hui hai',filepath:'Songs/1.mp3'},
    {coverphoto: 'Photos/3.jpg',songname:'Chatak Matak',filepath:'Songs/chatakmatak.mp3'},
    {coverphoto: 'Photos/4.jpg',songname:'Chandigarh me ',filepath:'Songs/chandigarh.mp3'},
    {coverphoto: 'Photos/5.jpg',songname:'Burjkhalifa',filepath:'Songs/Burj.mp3'},
    {coverphoto: 'Photos/6.jpg',songname:'BP high',filepath:'Songs/Bp.mp3'},
    {coverphoto: 'Photos/7.jpg',songname:'Baarish ki jaye',filepath:'Songs/baarish.mp3'},
    {coverphoto: 'Photos/8.jpg',songname:'Angreji Beat',filepath:'Songs/Angrjibeat.mp3'},
    {coverphoto: 'Photos/9.jpg',songname:'Aao kabhi haweli pe ',filepath:'Songs/aaokabhi.mp3'},
    {coverphoto: 'Photos/10.jpg',songname:'Agar tum sath ho',filepath:'Songs/agartum.mp3'},
    {coverphoto: 'Photos/10.jpg',songname:'Waallian',filepath:'Songs/Waalian.mp3'}
];
let index = 0;
song = new Audio(songItems[index].filepath);
let play = document.getElementById("play");


//Adding cover photos in HTML 
let cover = document.getElementsByClassName("cover");
for (let i = 0; i<cover.length;i++) {
    cover[i].innerHTML = "<img src ='' alt=''>";
    cover[i].firstChild.src = songItems[i].coverphoto;
}

//Inserting Song Name in HTML
let Name = document.getElementsByClassName("name");
for(let j = 0;j < Name.length;j++){
    Name[j].innerHTML = songItems[j].songname;
}

//Controller through its list (main);
let playPause = document.getElementsByClassName("playpause");
for(let k = 0; k < playPause.length; k++){

    playPause[k].addEventListener("click",()=>{
        //set input value = 0 in every click of song list
        document.getElementById("range").value = "0";
        song.pause();
        if(song.currentTime == 0 || song.paused){

            song = new Audio(songItems[k].filepath);
            song.play();
            document.getElementById("play").classList.remove("fa-play");
            document.getElementById("play").classList.add("fa-pause");
            document.getElementById("gif").style.opacity = "1";
            document.getElementById("songname").innerText = songItems[k].songname;

        }

        //set all gif invisible
        for(let f = 0; f < document.getElementsByClassName("pause").length;f++){
            document.getElementsByClassName("pause")[f].style.opacity = "0";
        }
        //set gif visible of current playing song
        document.getElementsByClassName("pause")[k].style.opacity = "1";
        
        //to update seekbar (input type="range") according to percentage of particular playing song.
        song.addEventListener("timeupdate",function rto(){
            document.getElementById("range").value = parseInt((song.currentTime/song.duration) *100);
             
        });

    })
}


//controller of play pause button in bottom of HTML
play.addEventListener("click",function playpause(){
    if(song.currentTime == 0 || song.paused){
        song.play();
        document.getElementById("play").classList.remove("fa-play");
        document.getElementById("play").classList.add("fa-pause");
        document.getElementById("gif").style.opacity = "1";
        document.getElementById("songname").innerText = songItems[index].songname;
        document.getElementsByClassName("pause")[index].style.opacity = "1";
    }else{
        song.pause();
        document.getElementById("play").classList.remove("fa-pause");
        document.getElementById("play").classList.add("fa-play");
        document.getElementById("gif").style.opacity = "0";
        document.getElementById("songname").innerText = "";
        document.getElementsByClassName("pause")[index].style.opacity = "0";
    }

    //To update seek bar in first (default) playing song
    song.addEventListener("timeupdate",function rto(){
        document.getElementById("range").value = parseInt((song.currentTime/song.duration) *100);
         
    });


});


//controller of next button in bottom of HTML
document.getElementById("next").addEventListener("click",function next(){


    document.getElementsByClassName("pause")[index].style.opacity = "0";
    song.pause();
    
    if(index == songItems.length - 1){
        
        index = 0;
        song = new Audio(songItems[index].filepath);
        song.play();
        document.getElementById("songname").innerText = songItems[index].songname;
        document.getElementsByClassName("pause")[index].style.opacity = "1";

    }else{
        song = new Audio(songItems[index + 1].filepath);
        song.play();
        document.getElementById("songname").innerText = songItems[index+1].songname;
        document.getElementsByClassName("pause")[index + 1].style.opacity = "1";
        index++;      
          
    }
    
    //set all gif invisible in click of next button.
    for(let f = 0; f < document.getElementsByClassName("pause").length;f++){
        document.getElementsByClassName("pause")[f].style.opacity = "0";
    }
    //set gif visible of current playing song in click of next button.
    document.getElementsByClassName("pause")[index].style.opacity = "1";

    //to update seekbar in every click of next button
    song.addEventListener("timeupdate",function rto(){
        document.getElementById("range").value = parseInt((song.currentTime/song.duration) *100);
         
    });  
});

//controller of previous button in bottom of HTML
document.getElementById("prev").addEventListener("click",()=>{

    document.getElementsByClassName("pause")[index].style.opacity = "0";
    song.pause();
    if(index == 0){
        index = songItems.length - 1;
        song = new Audio(songItems[index].filepath);
        song.play();
        document.getElementById("songname").innerText = songItems[index].songname;
        document.getElementsByClassName("pause")[index].style.opacity = "1";
    }else{
        song = new Audio(songItems[index-1].filepath);
        song.play();
        document.getElementById("songname").innerText = songItems[index-1].songname;
        document.getElementsByClassName("pause")[index - 1].style.opacity = "1";
        index--;
    }
    //set all gif invisible in click of previous button.
    for(let f = 0; f < document.getElementsByClassName("pause").length;f++){
        document.getElementsByClassName("pause")[f].style.opacity = "0";
    }
    //set gif visible of current playing song in click of previous button.
    document.getElementsByClassName("pause")[index].style.opacity = "1";

    //to update seek bar in every click of previous button
    song.addEventListener("timeupdate",function rto(){
        document.getElementById("range").value = parseInt((song.currentTime/song.duration) *100);
         
    });
});

//to update song's current time according to  change of input's value . 
document.getElementById("range").addEventListener("change",()=>{
    song.currentTime = ( document.getElementById("range").value * song.duration)/100;
});






