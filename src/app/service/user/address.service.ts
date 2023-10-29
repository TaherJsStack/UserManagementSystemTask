import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AddressModel } from 'src/app/models/address/address';
import { CityModel } from 'src/app/models/address/city';
import { GovernoratesModel } from 'src/app/models/address/governorates';
import { environment } from 'src/environments/environment';

const _API = environment.API_URL + 'address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  getList(
    pageSize: number = 20,
    pageNo:   number = 1
  ): Observable<{ list: AddressModel[]; count: number, message: string, status: number }> {
    return this.http
      .get<{ list: any[]; count: number, message: string, status: number }>(
        `${_API}?PageNo=${pageNo}&PageSize=${pageSize}`
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  add(address: AddressModel | {}): Observable<{ message: string, status: number  }>{
    return this.http
      .post<{ message: string, status: number }>
      (`${_API}/`, address)
  }

  update(id: string, address: {}): Observable<{ message: string, status: number  }>{
    return this.http
      .put<{ message: string, status: number }>
      (`${_API}/${id}`, address)
  }

  changeState(id: string, address: {}): Observable<{ message: string, status: number  }>{
    return this.http
      .put<{ message: string, status: number }>
      (`${_API}/${id}`, address)
  }

  getById(id: string): Observable<{ list: AddressModel[], message: string, status: number  }>{
    return this.http
      .get<{ list: AddressModel[], message: string, status: number }>
      (`${_API}/${id}`)
  }

  // getCategoryProducts(categoryId: string, filter: object= {}): Observable<{ list: ProductModel[], message: string, status: number  }>{
  //   return this.http
  //     .get<{ list: ProductModel[], message: string, status: number }>
  //     (`${_API}products/getCategoryProducts/${categoryId}?filter=${ JSON.stringify(filter) }`)
  // }

  delete(id: string): Observable<{ message: string, status: number  }>{
    return this.http
      .delete<{ message: string, status: number  }>(`${_API}/${id}`)
  }

  // --------------------------------------------------------------------------
  getGovernorates(
    filter:  object  = {},
  ): Observable<{ list: GovernoratesModel[]; message: string, status: number  }> {

    return this.http
    .get<{ list: GovernoratesModel[]; message: string, status: number }>(
      `${_API}/getGovernorates?filter=${ JSON.stringify(filter) }`
    )
    .pipe(
      tap((res) => {
        return res;
      })
    );
  }

  getCitiesContaineValue(): Observable<{ list: CityModel[]; message: string, status: number  }> {
    return this.http
    .get<{ list: CityModel[]; message: string, status: number }>(
      `${_API}/getCitiesContaineValue`
    )
    .pipe(
      tap((res) => {

        let d = res.list.map(item => {
          return {
            id: item.id,
            cite: item.city_name_en,
            value: item.deliveryValue,

          }
        })
        return res;
      })
    );
  }

  getGovernoratesCities(
    id: string, 
    filter:  object  = {}
    ): Observable<{ list: CityModel[], message: string, status: number  }>{
    return this.http
      .get<{ list: CityModel[], message: string, status: number }>
      (`${_API}/getCities/${id}?filter=${ JSON.stringify(filter) }`)
  }

  updateDeliveryValueList(valuse: {_id: string ,city: string, value: number}[]): Observable<{ message: string, status: number  }>{
    return this.http
      .put<{ message: string, status: number }>
      (`${_API}/updateCities`, valuse)
  }

  changeGovernorateState(id: string, address: {}): Observable<{ message: string, status: number  }>{
    return this.http
      .put<{ message: string, status: number }>
      (`${_API}/changeGovernorateState/${id}`, address)
  }

  getShippingValue(
    city: string, 
    filter:  object  = {}
    ): Observable<{ list: CityModel, message: string, status: number  }>{
    return this.http
      .get<{ list: CityModel, message: string, status: number }>
      (`${_API}/getShippingValue/${city}?filter=${ JSON.stringify(filter) }`)
  }
  

}
