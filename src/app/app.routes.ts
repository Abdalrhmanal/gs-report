import { Route } from '@angular/router';
import { ConnectionDatabaseComponent } from './connection-database/connection-database.component';
import { ChatSqlComponent } from './chat-sql/chat-sql.component';
import { SittingCountactComponent } from './sitting-countact/sitting-countact.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

export const appRoutes: Route[] = [
    {'path':'countacttodb',component:ConnectionDatabaseComponent},
    {'path':'chat',component:ChatSqlComponent},
    {'path':'',component:SittingCountactComponent},
    {'path':'filenew',component:UploadFileComponent},
];
