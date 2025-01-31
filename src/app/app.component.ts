import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConnectionDatabaseComponent } from "./connection-database/connection-database.component";
/* import { NxWelcomeComponent } from "./nx-welcome.component";
 */import { ChatSqlComponent } from "./chat-sql/chat-sql.component";

@Component({
  imports: [RouterModule, ConnectionDatabaseComponent, /* NxWelcomeComponent, */ ChatSqlComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gs-report';
}
