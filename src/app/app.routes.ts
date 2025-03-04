import { Route } from '@angular/router';
import { ConnectionDatabaseComponent } from './connection-database/connection-database.component';
import { ChatSqlComponent } from './chat-sql/chat-sql.component';
import { SittingCountactComponent } from './sitting-countact/sitting-countact.component';

export const appRoutes: Route[] = [
    {'path':'',component:ConnectionDatabaseComponent},
    {'path':'chat',component:ChatSqlComponent},
    {'path':'sitting',component:SittingCountactComponent},
];
