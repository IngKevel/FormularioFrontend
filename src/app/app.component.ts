import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';

const CREATE_USER = gql`
mutation ($nombre: String!, $correo: String!, $telefono: String!, $mensaje: String!) {
  createPersona (datos: {
    nombre: $nombre,
    correo: $correo,
    telefono: $telefono,
    mensaje: $mensaje
  }) {
    id
    nombre
  }
}
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'frontend';

  siteKey: string;

  users: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {
    this.siteKey = '6LclO0MaAAAAANVn-g6_ooRgj3IeBd8pgvmVjFk_';
   }

  ngOnInit(): void {
  
  }

  createUser(nombre: string, correo: string, telefono: string, mensaje: string) {
    
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        nombre,
        correo,
        telefono,
        mensaje
      }
    }).subscribe(({ data }) => {
      console.log('Agregado', data);
    },(error) => {
      console.log('Hubo un error', error);
    });
    (<HTMLInputElement>document.getElementById("formulario")).style.display = 'none';
    (<HTMLInputElement>document.getElementById("mensajeFinal")).style.display = 'block';
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}