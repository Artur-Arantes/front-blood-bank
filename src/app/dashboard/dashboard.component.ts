import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateStatistics } from '../models/state-statistics.model';

interface ImcByAgeOutPutDto {
    fromAge: number;
    toAge: number;
    imc: number; 
}

interface ObesityPercentageOutputDto {
    male_percentage_of_obesity: number;
    female_percentage_of_obesity: number;
}

interface AverageAgeByBloodTypeOutputDto {
  bloodType: string; 
  averageAge: number; 
}

interface PotentialDonorsOutputDto {
  bloodType: string;
  count: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(private http: HttpClient) {}
    
    stateData: StateStatistics = {}; 
    imcData: ImcByAgeOutPutDto[] = [];
    obesityData: ObesityPercentageOutputDto | null = null; 
    averageAgeByBloodTypeData: AverageAgeByBloodTypeOutputDto[] = [];
    potentialDonorsData: PotentialDonorsOutputDto[] = [];

    hasStateData(): boolean {
        return Object.keys(this.stateData).length > 0;
    }

    getData1() {
        this.http.get('https://blood-bank-fbfe212a842b.herokuapp.com/v1/api/statistics/state').subscribe(
            (response) => {
                this.stateData = response as StateStatistics;
                console.log('Dados 1:', response);
                this.imcData = [];
                this.obesityData = null;
                this.averageAgeByBloodTypeData = [];
                this.potentialDonorsData = [];
            },
            (error) => {
                console.error('Erro ao buscar dados 1:', error);
            }
        );
    }

    getData2() {
        this.http.get<ImcByAgeOutPutDto[]>('https://blood-bank-fbfe212a842b.herokuapp.com/v1/api/statistics/age').subscribe(
            (response) => {
                this.imcData = response; 
                console.log('IMC Médio por Faixa Etária:', this.imcData);
                this.stateData = {};
                this.obesityData = null;
                this.averageAgeByBloodTypeData = [];
                this.potentialDonorsData = [];
            },
            (error) => {
                console.error('Erro ao buscar dados de IMC por idade:', error);
            }
        );
    }

    getData3() {
        this.http.get<ObesityPercentageOutputDto>('https://blood-bank-fbfe212a842b.herokuapp.com/v1/api/statistics/obesity').subscribe(
            (response) => {
                this.obesityData = response; 
                console.log('Percentual de Obesidade:', this.obesityData);
                this.stateData = {};
                this.imcData = [];
                this.potentialDonorsData = [];
                this.averageAgeByBloodTypeData = [];
            },
            (error) => {
                console.error('Erro ao buscar dados 3:', error);
            }
        );
    }

    getData4() {
        this.http.get('https://blood-bank-fbfe212a842b.herokuapp.com/v1/api/statistics/blood-type').subscribe(
            (response) => {
                console.log('Dados 4:', response);
                this.averageAgeByBloodTypeData = Object.entries(response).map(([key, value]) => ({
                  bloodType: key,
                  averageAge: value,
              }));
              console.log('Média de Idade por Tipo Sanguíneo:', this.averageAgeByBloodTypeData);
              this.stateData = {};
              this.imcData = [];
              this.obesityData = null;
              this.potentialDonorsData = [];
            },
            (error) => {
                console.error('Erro ao buscar dados 4:', error);
            }
        );
    }

    getData5() {
        this.http.get('https://blood-bank-fbfe212a842b.herokuapp.com/v1/api/statistics/donors').subscribe(
            (response) => {
                console.log('Dados 5:', response);
                this.potentialDonorsData = Object.entries(response).map(([key, value]) => ({
                  bloodType: key,
                  count: value,
              }));
              this.stateData = {};
              this.imcData = [];
              this.obesityData = null;
              this.averageAgeByBloodTypeData = [];
            },
            (error) => {
                console.error('Erro ao buscar dados 5:', error);
            }
        );
    }
}
