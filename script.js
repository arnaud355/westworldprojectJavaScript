let soif = false;
let fatigue = false;
let assezRiche = false;

let nivSoif = 0, nivFatigue = 0, nivRichesse = 0;
let localisation = "mine";
let compteurPersonne = 0;
let compteBancaire = 0;
const seuilSoifEtFatigue = 80;
const seuilRichesseJour = 300;
const goldenRetreat = 2500;

class Personne {
	constructor(name,compteBancaire){
		this._name = name;
		this._compteBancaire = compteBancaire;
		compteurPersonne++;
	}
	get compteBancaire(){
		return "Compte en banque de " + this._name + ": " + this._compteBancaire + "gr de pépites d'or";
	}
	set compteBancaire(value){
		this._compteBancaire = this._compteBancaire + value;
	}
	
	sePresenter() {
		console.log("My name is " + this._name);
	}	
}
class State {
	constructor(nivSoif,nivFatigue,nivRichesse,localisation){
		this._nivSoif = nivSoif;
		this._nivFatigue = nivFatigue;
		this._nivRichesse = nivRichesse;
		this._localisation = localisation;
	}
	
	changerValeurSoif(){
		//Après coup de pioche on augmente la valeur de soif aléatoirement entre +5 à +19 + 5
		this._nivSoif = this._nivSoif + Math.round(Math.random() * 20) + 5;	
		Bob.nivSoif = this._nivSoif;
	}
	changerValeurFatigue(){
		//Après coup de pioche on change la valeur de fatigue aléatoirement entre +5 à +19 + 5
		this._nivFatigue = this._nivFatigue + Math.round(Math.random() * 20) + 5;	
		Bob.nivFatigue = this._nivFatigue;
	}
	
}
class boireAuSaloon extends State {
	constructor(nivSoif,nivFatigue,nivRichesse,localisation){
		super(nivSoif,nivFatigue,nivRichesse,localisation);
	}
	
	/*C'est une méthode de BobEtat, l'instance de la classe boireAuSaloon, et non pas 
	de l'instance Bob qui est de la classe Mineur */
	diminuerValeurSoif(){
		if(this._localisation != "saloon"){
			Bob.localisation = "saloon";
		}
		//Après verre on diminue la valeur aléatoirement entre -1 à -19
		this._nivSoif = this._nivSoif - Math.round(Math.random() * 20);
		console.log(Bob.infoLocalisation);
		console.log("Bob bois un coup au saloon");
		//On affecte la nouvelle valeur de soif de l'état de Bob dans le niv de soif de Bob
		Bob.nivSoif = this._nivSoif;
	}
}
class rentrerMaisonSeReposer extends State{
	constructor(nivSoif,nivFatigue,nivRichesse,localisation){
		super(nivSoif,nivFatigue,nivRichesse,localisation);
	}
	
	diminuerValeurFatigue(){
		if(this._localisation != "home"){
			Bob.localisation = "home";
		}
		//Après verre on diminue la valeur aléatoirement entre -1 à -19
		this._nivFatigue = this._nivFatigue - Math.round(Math.random() * 20);	
		Bob.nivFatigue = this._nivFatigue;
		console.log(Bob.infoLocalisation);
		console.log("Bob dort à la maison");
	}	
}
class depotPepitesBanque extends State{
	constructor(nivSoif,nivFatigue,nivRichesse,localisation){
		super(nivSoif,nivFatigue,nivRichesse,localisation);
	}
	
	ajoutSurCompte(){
		if(this._localisation != "banque"){
			Bob.localisation = "banque";
		}			
		Bob.compteBancaire = Bob.compteBancaire + this._nivRichesse;
		this._nivRichesse = 0;
		Bob.nivRichesse = this._nivRichesse;
		console.log(Bob.infoLocalisation);
		console.log(Bob.compteBancaire);
	}	
}
class creuserALaMine extends State {
	constructor(nivSoif,nivFatigue,nivRichesse,localisation){
		super(nivSoif,nivFatigue,nivRichesse,localisation);
	}
	
	//C'est BobEtat de la classe creuserALaMine qui pioche
	piocherPepites() {
			if(this._localisation != "mine"){
				Bob.localisation = "mine";
			}
		console.log(Bob.infoLocalisation);
		console.log("Bob creuse et cherche des pépites");
		//Après coup de pioche on change la valeur aléatoirement entre +5 à +199 + 5
		this._nivRichesse = this._nivRichesse + Math.round(Math.random() * 200) + 5;
		Bob.nivRichesse = this._nivRichesse;
		super.changerValeurFatigue();
		super.changerValeurSoif();
	}	
}
class Mineur extends Personne {
	constructor(name,compteBancaire,nivSoif,nivFatigue,nivRichesse,localisation){
		super(name,compteBancaire);
		this._nivSoif = nivSoif;
		this._nivFatigue = nivFatigue;
		this._nivRichesse = nivRichesse;
		this._localisation = localisation;
	}
	
	get nivSoif(){
		return this._nivSoif;
	}
	set nivSoif(value){
		
		if(value > 0 && value <= 100){
			this._nivSoif = value;
		}
		else{
			console.log("Valeur de soif non conforme");
		}
	}
	get nivFatigue(){
		return this._nivFatigue;
	}
	set nivFatigue(value){
		
		if(value > 0 && value <= 100){
			this._nivFatigue = value;
		}
		else{
			console.log("Valeur de fatigue non conforme");
		}
	}
	get nivRichesse(){
		return this._nivRichesse;
	}
	set nivRichesse(value){
		
		if(value > 0 && value <= 100){
			this._nivRichesse = value;
		}
		else{
			console.log("Valeur de richesse non conforme");
		}
	}
	get localisation(){
		return this._localisation;
	}
	set localisation(value){
		
		if(value.length > 0 && value.length <= 100){
			this._localisation = value;
		}
		else{
			console.log("Valeur de localisation non conforme");
		}
	}
	
	get infoNivSoif(){
		return "Niveau de soif actuel: " + this._nivSoif;
	}
	get infoNivFatigue(){
		return "Niveau de fatigue actuel: " + this._nivFatigue;
	}
	get infoNivRichesse(){
		return "Niveau de richesse actuel: " + this._nivRichesse;
	}
	get infoLocalisation(){
		return "Localisation actuelle: " + this._localisation;
	}
	
	verifConditions() {
		if(this._nivSoif >= seuilSoifEtFatigue){
			soif = true;
			BobEtat = new boireAuSaloon(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);
			BobEtat.diminuerValeurSoif();
		}
		else{
			soif = false;
		}
		
		if(this._nivFatigue >= seuilSoifEtFatigue && !soif){
			fatigue = true;
			BobEtat = new rentrerMaisonSeReposer(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);
			BobEtat.diminuerValeurFatigue();
		}
		else{
			fatigue = false;
		}
		
		if(this._nivRichesse >= seuilRichesseJour){
			assezRiche = true;
			if(this._nivFatigue < seuilSoifEtFatigue && !soif){
				BobEtat = new depotPepitesBanque(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);
				BobEtat.ajoutSurCompte();
			}
			
		}
		else{
			assezRiche = false;
			BobEtat = new creuserALaMine(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);
			BobEtat.piocherPepites();
		}
	}	
}

let Bob = new Mineur("Bob",compteBancaire,nivSoif,nivFatigue,nivRichesse,localisation);
let BobEtat = new State(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);

//Le première état devrait être creuserALaMine


while(Bob.compteBancaire != goldenRetreat){
	/*nivSoifInstance = Bob.nivSoif
	nivFatigueInstance = Bob.nivFatigue
	nivRichesseInstance = Bob.nivRichesse
	localisationInstance = Bob.localisation
	Bob.verifConditions(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);*/
	Bob.verifConditions();
}

console.log("Bob a fait fortune!");

//***********à effacer
class Personnage {
	constructor(nom){
		//Avec le underscore on privatise la propriété
		this._nom = nom;
	}
	
	get nom(){
		return "Mr " + this._nom;
	}
	set nom(value){
		
		if(value.length > 2){
			this._nom = value;
		}
		else{
			console.log("Mot trop court");
		}
	}
}
let arn = new Personnage("Arno");

//console.log(arn.nom());  Ne marche pas
console.log(arn.nom);

//arn.nom("Arnaud"); Ne marche pas
arn.nom = "Arnaud";
console.log(arn.nom);
