import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  @Output() domainReceived: EventEmitter<String> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.wrapperFunc();
  }


  wrapperFunc() {
    this.display_sendButton_Now();
    this.hide_sendButton_Now();
    this.display_sendText_Now();
    this.hide_sendText_Now();
    this.display_chatspace_Now();
    this.hide_chatspace_Now();
    this.display_chatlogo_Now();
    this.hide_chatlogo_Now();
    this.display_speechToTextButton_Now();
    this.hide_speechToTextButton_Now();

    var voiceOptions = document.getElementById('voiceOptions');
    var volumeSlider = document.getElementById('volumeSlider');
    var rateSlider = document.getElementById('rateSlider');
    var pitchSlider = document.getElementById('pitchSlider');
    var voiceMap = [];

    function checkCompatibilty() 
      {
        if(!('speechSynthesis' in window)){
          alert('Your browser is not supported. If google chrome, please upgrade!!');
        }
      };
  
      checkCompatibilty();
  
      function loadVoices() 
      {
        var voices = speechSynthesis.getVoices();
        console.log(voices);
        for (var i = 0; i < voices.length; i++) 
        {
          var voice = voices[i];
          var option = document.createElement('option');
          option.value = voice.name;
          option.innerHTML = voice.name;
          voiceOptions.appendChild(option);
          voiceMap[voice.name] = voice;
        };
      };
  
      window.speechSynthesis.onvoiceschanged = function(e)
      {
        loadVoices();
      };
  
      function speak (myText) 
      {
        var msg = new SpeechSynthesisUtterance();
        msg.volume = Number((<HTMLInputElement>volumeSlider).value);
        msg.voice = voiceMap[(<HTMLInputElement>voiceOptions).value];
        msg.rate = Number((<HTMLInputElement>rateSlider).value);
        msg.pitch = Number((<HTMLInputElement>pitchSlider).value);
        msg.text = myText;
        window.speechSynthesis.speak(msg);
      };
            
            //______________________________SCRIPTING TEXT-TO-SPEECH SECTION END__________________________________
  
            //______________________________SCRIPTING COOKIE OPERATIONS SECTION START_____________________________
  
      function setCookie(cname, cvalue, exhours) 
      {
          var d = new Date();
          d.setTime(d.getTime() + (exhours * 60 * 1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + "path=https://weatherappneel.000webhostapp.com/RefreadBotNeel/index4[WithEncryption&Token].html";
      };
  
      function getCookie(cname) 
      {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i = 0; i < ca.length; i++) 
          {
              var c = ca[i];
              while (c.charAt(0) == ' ') 
              {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) 
              {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      };
  
      //______________________________SCRIPTING COOKIE OPERATIONS SECTION END_______________________________

      //_____________________________MAKING INPUT FEILD - REQUIRED START___________________________________
      
      function required(inputtx) 
         {
           if (inputtx.length == 0)
            {  	
               return false; 
            }  	
            return true; 
        }; 
  
        //_____________________________MAKING INPUT FEILD - REQUIRED END_____________________________________
  
      //_________________________TRIGGER BUTTON CLICK ON 'ENTER' KEY PRESS START___________________________
  
      var input = document.getElementById("sendText_id");
      input.addEventListener("keyup", function(event) 
      {
          event.preventDefault();
          if (event.keyCode === 13) {
              document.getElementById("sendButton_id").click();
          }
      });
  
      //_________________________TRIGGER BUTTON CLICK ON 'ENTER' KEY PRESS END____________________________
  
      //__________________________SCRIPTING TO DISPLAY WHAT USER SAID START_______________________________
  
      function displayWhatUserSaid()
      {
        var UserMessage="ME: " + (<HTMLInputElement>document.getElementById("sendText_id")).value;
        if(required(UserMessage)) 
        {
          var chatspaceVar = document.getElementById("chatspace_id");
                  chatspaceVar.innerHTML += '<div class="userMessage">'+UserMessage+'</div>';
                  chatspaceVar.scrollTop = chatspaceVar.scrollHeight;
        }
        else
        {
          //NO OPERATION
        }
      };
  
      //__________________________SCRIPTING TO DISPLAY WHAT USER SAID END_________________________________
  
      //___SCRIPTING TO DISPLAY WHAT CHATBOT SAID START____SENDING MESSAGE TO CHATBOT API___START_________

      var domain;
      function displayWhatChatbotSaid()
      {
        var UserMessage="ARJUN: " + (<HTMLInputElement>document.getElementById("sendText_id")).value;
        if(required(UserMessage)) 
        {                                    
          domain = access_Chatbot_API();
          console.log("Chatbot Component", domain);
        }
        else
        {
          alert("Your message is empty"); 
        }
      };
      if(domain != null) {
        console.log("ChatbotComponent: Emitted Event");
        this.domainReceived.emit(domain);
      }
  
      //________________________________STANDARD RESPONSES SECTION START____________________________________
  
      (<any>Array.prototype).randomElement = function () 
      {
          return this[Math.floor(Math.random() * this.length)]
      };
  
      var myArray = ["Sorry, I guess the server is down. Not Refead's but mine!","Apologies, I think my backend has some problem. Talk to you later.","Really sorry, server's down I think. I'll go and wake him up. Can you please ping me after some time.","Very Sorry..But couldn't connect to the server","Sorry, my server's unreachable"];
  
      //________________________________STANDARD RESPONSES SECTION END_______________________________________
  
      //________________________________HITTING THE REST API SECTION START___________________________________
  
      function access_Chatbot_API()
      {
        var i=0;
        var ourRequest = new XMLHttpRequest();
        var UserMessage = (<HTMLInputElement>document.getElementById("sendText_id")).value;
        var domain = "";
          
        //Encrypting the question we are passing with 000 as a kind of VALIDITY
        //UserMessage = encrypt(UserMessage);
        
        //UserMessage = encodeURIComponent(UserMessage).replace(/%20/g,'+');
        UserMessage = UserMessage.replace(' ','_');
        UserMessage = UserMessage.replace('?','+');
        //console.log("TOKEN:"+token+"|");
        //console.log("SESSIONID"+sessionID);
  
        //ourRequest.setRequestHeader("ChatbotAPIAuthToken", token); //Added on 7/7/18
        //ourRequest.setRequestHeader("SessionID", sessionID); //Added on 7/7/18
        ourRequest.onreadystatechange = function() 
        {
          //Chatbot text
          if(ourRequest.readyState!=4 && ourRequest.status!=200)
          {
            if(i==1)
                         {
                            i=0;
                          var myRandomElement = (<any>myArray).randomElement();
                             var ChatbotMessage= myRandomElement ; 
                          var chatspaceVar = document.getElementById("chatspace_id")
                            chatspaceVar.innerHTML += '<div class="chatbotMessage" style="background-color: blue">ARJUN: '+ChatbotMessage+'</div>';
                            if(String(ChatbotMessage).startsWith("Redirecting")) {
                              domain = String(ChatbotMessage).split(':')[1];
                            }
                            speak(ChatbotMessage);
                            chatspaceVar.scrollTop=chatspaceVar.scrollHeight;
                            (<HTMLInputElement>document.getElementById("sendText_id")).value="";
                        }
          }	
                    else
                    {
                         //var ourData = this.responseText;
                        if(i==0){
                            i=1;
                         }
                        else if(i==1){
                             i=2;
                            var chatspaceVar = document.getElementById("chatspace_id")
                            chatspaceVar.innerHTML += '<div class="chatbotMessage">'+ourRequest.responseText+'</div>';
                            if(String(ourRequest.responseText).startsWith("Redirecting")) {
                              domain = String(ourRequest.responseText).split(':')[1];
                              console.log(String(ourRequest.responseText).split(':'));
                            }
                            speak(ourRequest.responseText);
                             chatspaceVar.scrollTop=chatspaceVar.scrollHeight;
                             (<HTMLInputElement>document.getElementById("sendText_id")).value="";
                         }
                     }
        };
        ourRequest.open("GET", "https://ed71ea0b.ngrok.io/"+UserMessage+"/1");
        ourRequest.send();
        return domain;
      };

      //________________________________HITTING THE REST API SECTION END________________________________
  
      //___SCRIPTING TO DISPLAY WHAT CHATBOT SAID START____SENDING MESSAGE TO CHATBOT API___END_________
  
      //__________________________SCRIPTING - SPEECH RECOGNITION START__________________________________
  
      function speechToTextConversion()
      {			
        var SpeechRecognition = SpeechRecognition || Window['webkitSpeechRecognition'];
        var SpeechRecognitionEvent = SpeechRecognitionEvent || Window['webkitSpeechRecognitionEvent'];
        var recognition = new SpeechRecognition();
        var diagnostic = document.getElementById('sendText_id');
        var i=0;
        var j=0;
        recognition.continuous = true;
        recognition.lang = 'en-IN';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
  
        //_____________________________SPEECH RECOGNITION EVENTS START________________________________
                
        document.getElementById("speechToText_id").onclick = function() 
        {
            if(i==0)
            {
                if(j==0)
                {
                    j=1;
                    document.getElementById('id01').style.display='block';
                }
                else
                {
                    if((<HTMLInputElement>document.getElementById("Hindi")).checked)
                    {
                        recognition.lang = 'hi-IN';
                    }
                    else if((<HTMLInputElement>document.getElementById("Gujarati")).checked)
                    {
                        recognition.lang = 'gu-IN';
                    }
                    else if((<HTMLInputElement>document.getElementById("Bengali")).checked)
                    {
                        recognition.lang = 'bn-IN';   
                    }
                    else if((<HTMLInputElement>document.getElementById("Kannada")).checked)
                    {
                        recognition.lang = 'kn-IN';   
                    }
                    else if((<HTMLInputElement>document.getElementById("Malayalam")).checked)
                    {
                        recognition.lang = 'ml-IN';   
                    }
                    else if((<HTMLInputElement>document.getElementById("Marathi")).checked)
                    {
                        recognition.lang = 'mr-IN';   
                    }
                    else if((<HTMLInputElement>document.getElementById("Tamil")).checked)
                    {
                        recognition.lang = 'ta-IN';   
                    }
                    else if((<HTMLInputElement>document.getElementById("Telegu")).checked)
                    {
                        recognition.lang = 'te-IN';   
                    }
                    else if((<HTMLInputElement>document.getElementById("Urdu")).checked)
                    {
                        recognition.lang = 'ur-IN';   
                    }
                    else
                    {
                        recognition.lang = 'en-IN';
                    }
                    document.getElementById("speechToText_id").style.background="red";
                    recognition.start();
                    i=1;
                }
            }
            else
            {
                 document.getElementById("speechToText_id").style.background="white";
                 recognition.stop();
                 i=0;
            }
        }
        recognition.onresult = function(event) {
          var last = event.results.length - 1;
          var convertedText = event.results[last][0].transcript;
          (<HTMLInputElement>diagnostic).value = convertedText;
          console.log('Confidence: ' + event.results[0][0].confidence);
        }
        recognition.onnomatch = function(event) {
          (<HTMLInputElement>diagnostic).value = 'I didnt recognise that.';
        }
        recognition.onerror = function(event) {
          (<HTMLInputElement>diagnostic).value = 'Error occurred in recognition: ' + event.error;
        }
  
        //_____________________________SPEECH RECOGNITION EVENTS END________________________________
      };
  }

  display_sendButton_Now(){document.getElementById('sendButton_id').style.visibility='visible'};
  hide_sendButton_Now(){document.getElementById('sendButton_id').style.visibility='hidden'};
  display_sendText_Now(){document.getElementById('sendText_id').style.visibility='visible';document.getElementById('sendText_id').focus();};
  hide_sendText_Now(){document.getElementById('sendText_id').style.visibility='hidden';};
  display_chatspace_Now(){document.getElementById('chatspace_id').style.display='block';};
  hide_chatspace_Now(){document.getElementById('chatspace_id').style.display='none'};
  display_chatlogo_Now(){document.getElementById('chatspace_logo_id').style.display='block';};
  hide_chatlogo_Now(){document.getElementById('chatspace_logo_id').style.display='none';};
  display_speechToTextButton_Now(){document.getElementById('speechToText_id').style.visibility='visible';};
  hide_speechToTextButton_Now(){document.getElementById('speechToText_id').style.visibility='hidden';};

}
