import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Rounting Module
import { AppRoutingModule } from './app-routing.module';
// HttpClientModule
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
// Component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { FlexLayoutModule } from '@angular/flex-layout';
// Services
import { DeezerService } from './services/deezer.service';
// Angular-Material
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SecondsToTimePipe } from './playlist/seconds-to-time.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    SecondsToTimePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientJsonpModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    ScrollingModule,
    AppRoutingModule,
  ],
  providers: [DeezerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
