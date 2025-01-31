import { Route } from '@angular/router';
import { ConnectionDatabaseComponent } from './connection-database/connection-database.component';
import { ChatSqlComponent } from './chat-sql/chat-sql.component';

export const appRoutes: Route[] = [
    {'path':'',component:ConnectionDatabaseComponent},
    {'path':'chat',component:ChatSqlComponent},
];
