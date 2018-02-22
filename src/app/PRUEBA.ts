import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'app';
  results = '';

  mybody;
  myoptions;
  mydata;

  constructor(private http: HttpClient){
  }
  ngOnInit(): void {

    /////////////////////////////////////////////////////////////
    ///// Acceso a API sin autentificacion

    // https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b

    /*
    this.mybody    = { "title":"hola", "content":"contenido" };
    this.myoptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    this.http.post('/api/notes', this.mybody, this.myoptions)
      .subscribe(data => {
      this.mydata = data;
      console.log(this.mydata);
      }
    );

    this.http.get('/api/notes')
      .subscribe(data => {
      this.mydata = data;
      console.log(this.mydata);
      }
    );
    */

    /////////////////////////////////////////////////////////////

    if (!localStorage.getItem('tk'))
    {  
      console.log("Usuario no autentificado, nos autentificamos..");

      this.mybody     = { "username" : "admin", "password" : "123" };
      this.myoptions  = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

      this.http.post <MyTokenResponse> ('/api/login', this.mybody, this.myoptions)
        .subscribe(data => { 
          this.mydata = data;

          console.log("/api/login");
          localStorage.setItem('tk', this.mydata.access_token);
          console.log("token generado: " + localStorage.getItem('tk'));        
        } );
    }
    else  
    {
      console.log("Usuario ya autentificado");
      console.log("token utilizado: " + localStorage.getItem('tk'));        
    }
          
    ////////////////////////////////////////////////////////////                        

    if (localStorage.getItem('tk'))
    {
      this.myoptions    = { headers: new HttpHeaders (
        { 'Content-Type' : 'application/json' , 
          'Authorization': 'Bearer ' + localStorage.getItem('tk') 
        }
      ) };                        

      this.http.get ('/api/whoami', this.myoptions)
        .subscribe(data => {
          this.mydata = data;        

          console.log("/api/whoami");
          console.log(this.mydata);
        } );
    }

    ////////////////////////////////////////////////////////////

    if (localStorage.getItem('tk'))
    {    
      this.myoptions    = { headers: new HttpHeaders (
        { 'Content-Type' : 'application/json' , 
          'Authorization': 'Bearer ' + localStorage.getItem('tk') 
        }
      ) };                        

      this.http.get ('/api/user/all', this.myoptions)
      .subscribe(data => {
        this.mydata = data;        

        console.log("/api/user/all");
        console.log(this.mydata);
      } );
    }

    ////////////////////////////////////////////////////////////    

    if (localStorage.getItem('tk'))
    {  
      this.mybody     = { };

      this.myoptions    = { headers: new HttpHeaders (
        { 'Content-Type' : 'application/json' , 
          'Authorization': 'Bearer ' + localStorage.getItem('tk') 
        }
      ) };                        
      
      this.http.post <MyTokenResponse> ('/api/refresh', this.mybody, this.myoptions)
        .subscribe(data => { 
          this.mydata = data;

          console.log("/api/refresh");
          console.log(this.mydata);
          localStorage.setItem('tk', this.mydata.access_token);
          console.log("nuevo token : " + localStorage.getItem('tk'));                  
        } );
    }

    //////////////////////////////////////////////////////////// 

    if (localStorage.getItem('tk'))
    {  
      this.mybody     = {"oldPassword" : "123" , "newPassword" : "456" };

      this.myoptions    = { headers: new HttpHeaders (
        { 'Content-Type' : 'application/json' , 
          'Authorization': 'Bearer ' + localStorage.getItem('tk') 
        }
      ) };                        
      
      this.http.post <MyTokenResponse> ('/api/change-password', this.mybody, this.myoptions)
        .subscribe(data => { 
          this.mydata = data;

          console.log("/api/change-password");
          console.log(this.mydata);
        } );

        ////
        this.mybody     = { };

        this.myoptions    = { headers: new HttpHeaders (
          { 'Content-Type' : 'application/json' , 
            'Authorization': 'Bearer ' + localStorage.getItem('tk') 
          }
        ) };                        
        
        this.http.post <MyTokenResponse> ('/api/refresh', this.mybody, this.myoptions)
          .subscribe(data => { 
            this.mydata = data;
  
            console.log("/api/refresh");
            console.log(this.mydata);
            localStorage.setItem('tk', this.mydata.access_token);
            console.log("nuevo token : " + localStorage.getItem('tk'));                  
          } );
    } 
    
    /////////////////////////////////////////////////////////////
    //// Acceso a API REST en internet

    this.http.get('https://jsonplaceholder.typicode.com/posts/')
      .subscribe(data => {
        console.log(data);
      } );    

  }
}

///////////////////////////////////////////////////////////////////////

interface MyTokenResponse {
  access_token: string;
  expires_in:   string;
}