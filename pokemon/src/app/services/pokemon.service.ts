import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Skills } from '../interfaces/skills.interface';
import { PokemonDetails } from '../interfaces/pokemon.interface';
import { Pokemon, PokemonsResponse } from '../interfaces/pokemons.interaface';


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private baseURL: string = 'https://pokeapi.co/api/v2';
  private limitPage = 20;
  public offsetPage = 0;

  constructor(private http:HttpClient) { }

  get params() {
    return {
      limit:this.limitPage,
      offset:this.offsetPage
    }
  }

  getPokemons():Observable<Pokemon[]>{
    return this.http.get<PokemonsResponse>(`${this.baseURL}/pokemon`,{params:this.params}).pipe(
    map(res=>res.results)
   )
  }


  getSearchPokemon(texto: string): Observable<Pokemon[]> {
    return this.http.get<{results: Pokemon[]}>(`${this.baseURL}/pokemon?limit=100`)
      .pipe(
        map(response => response.results.filter(pokemon => pokemon.name.includes(texto.toLowerCase())))
      );
  }

  getPokemonDetail(name:string):Observable<PokemonDetails>{
    return this.http.get<PokemonDetails>(`${this.baseURL}/pokemon/${name}`);
  }

  getSkills(url: string):Observable<Skills>{
    return this.http.get<Skills>(`${url}`);

  }

  getPaginacionNext(adelante:number){
    this.offsetPage = this.offsetPage + adelante
    console.log(this.offsetPage);
    return this.http.get<PokemonsResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.offsetPage}`).pipe(
    map(res=>res.results)
   )
  }

  getPaginacionPrevious(atras:number){
    this.offsetPage= this.offsetPage - atras;
    console.log(this.offsetPage);

    if (this.offsetPage === 0  ) {
      localStorage.setItem('Valor','detener');

    }

    return this.http.get<PokemonsResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.offsetPage}`).pipe(
    map(res=>res.results)
   )
  }

}
