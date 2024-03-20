export interface Genre {
  name: string;
  color: string;
}

const musicGenres: Genre[] = [
  {name: 'Blues', color: '#fe648a'},
  {name: 'Electronic', color: '#ef5e9a'},
  {name: 'Country', color: '#6ad2d7'},
  {name: 'Hip - Hop', color: '#e059ab'},
  {name: 'Gospel', color: '#b656ca'},
  {name: 'R&B', color: '#7f86df'},
  {name: 'Rock', color: '#79c3dc'},
  {name: 'Instrumental', color: '#786ce2'},
  {name: 'Folk', color: '#cc57ba'},
  {name: 'Jazz', color: '#9954d6'},
  {name: 'Stems', color: '#8099dd'},
  {name: 'Classical', color: '#50a5fd'},
  {name: 'Pop', color: '#5baef7'},
  {name: 'Reggae', color: '#66b8f0'},
  {name: 'World', color: '#6ecae0'},
  {name: 'Other', color: '#6f51e4'},
  {name: 'Rap', color: '#80b0dd'},
];

export default musicGenres;
