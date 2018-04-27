
import { Injectable } from '@angular/core';

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class ApiUrlConfigService {

  public _loginURL           = 'https://api.xavierpoveda.com/api/login';
  public _whoamiURL          = 'https://api.xavierpoveda.com/api/whoami';
  public _refreshURL         = 'https://api.xavierpoveda.com/api/refresh';
  public _change_passwordURL = 'https://api.xavierpoveda.com/api/change-password';

  public _userallURL         = 'https://api.xavierpoveda.com/api/user/all';

  public _getNotesURL        = 'https://api.xavierpoveda.com/api/v1/notes/';
  public _getNotesPageURL    = 'https://api.xavierpoveda.com/api/v1/notes_page/';
  public _getNotesCountURL   = 'https://api.xavierpoveda.com/api/v1/notes_count/';
  public _getNoteURL         = 'https://api.xavierpoveda.com/api/v1/notes/';
  public _postNoteURL        = 'https://api.xavierpoveda.com/api/v1/notes/';
  public _putNoteURL         = 'https://api.xavierpoveda.com/api/v1/notes/';
  public _deleteNoteURL      = 'https://api.xavierpoveda.com/api/v1/notes/';

  constructor() 
  { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

}
