/*
Bob est un mineur du Far West, il espère faire fortune, ses activités consiste à creuserALaMine,
boireAuSaloon, depotPepitesBanque, rentrerMaisonSeReposer.

Quand il creuse à la mine son niveau de fatigue augmente ainsi que sa soif, quand il a recolté suffissament
d'or pour la journée il se rend à la banque déposer ses pépites.

Sa première priorité est d'abord d'aller boire au saloon s'il a trop soif, ensuite de se reposer à la maison
s'il est trop fatigué.

Et quand il n'as pas soif et qu'il n'est pas fatigué, et qu'il accumulé suffissament de pépites d'or pour
la journée il vas les déposer sur son compteBancaire.

Elsa, la femme de Bob, peut faire plusieurs activités, préparer le diner, se coiffer, selon humeur...
*/
let soif = false;
let fatigue = false;
let assezRiche = false;
let probaDiner = 0;
let nivSoif = 0, nivFatigue = 0, nivRichesse = 0;
let localisation = "mine";
let compteurPersonne = 0, compteBancaire = 0;
let humeurElsa = 51;
let dinerServi = false;
let potagerARecolter = false;
let maturationFruitsLegumes = 49;
let d1 = 0, d1Milli = 0;
let BobEstMort = false;
let santeBob = 100, santeIvrogne = 100;
let coupDePoingsBob = 14;
const seuilSoifEtFatigue = 80;
const seuilRichesseJour = 300;
const goldenRetreat = 10000;

class Personne {
	constructor(name,sante,forceCoupDePoings,compteBancaire){
		this._name = name;
		this._sante = sante;
		this._forceCoupDePoings = forceCoupDePoings;
		this._compteBancaire = compteBancaire;
		compteurPersonne++;
	}
	get name(){
		return this._name;
	}
	set name(value){
		this._name = value;
	}
	get sante(){
		return this._sante;
	}
	set sante(value){
		this._sante = this._sante - value;
	}
	get compteBancaire(){
		return this._compteBancaire;
	}
	set compteBancaire(value){
		this._compteBancaire = this._compteBancaire + value;
	}
	
	get infoCompteBancaire(){
		return "Compte en banque de " + this._name + ": " + this._compteBancaire + "gr de pépites d'or";
	}
	
	sePresenter() {
		console.log("My name is " + this._name);
	}
	get forceCoupDePoings(){
		return this._forceCoupDePoings;
	}
	set forceCoupDePoings(value){
		this._forceCoupDePoings = value;
	}
	coupDePoings(){
		console.log(this._name + " distribue des coups de poings");
	}
	recevoirCoupDePoings(forceCoupDePoings){
		console.log(this._name + " reçoit des coups de poings");
		this.sante = this.sante - forceCoupDePoings;
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
		console.log("Chérie je suis de retour!");
		console.log("Bob dort ZZZZZZ");
	}
	rentreALaMaisonPourDiner(){
		if(this._localisation != "home"){
			//Allez boire est la priorité de Bob
			if(Bob.nivSoif < 80){
				Bob.localisation = "home";
				console.log("Chérie j'ai entendu ton message, je rentre pour diner");
			}
			else {
				BobEtat = new boireAuSaloon(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);
				console.log("Bob a trop soif, il est parti au saloon!");
				BobEtat.diminuerValeurSoif();
			}
		}
	}	
	rentreALaMaisonRamasserPotager(){
		if(this._localisation != "home"){
			if(Bob.nivSoif < 80){
				Bob.localisation = "home";
				console.log("Chérie j'ai entendu ton message, je viens ramasser les fruits et légumes du potager");
			}
			else {
				BobEtat = new boireAuSaloon(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);
				console.log("Bob a trop soif, il est parti au saloon!");
				BobEtat.diminuerValeurSoif();
			}
		}
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
		console.log(Bob.infoCompteBancaire);
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
class FemmeMineur extends Personne {
	constructor(name,compteBancaire,humeurElsa,probaDiner,dinerServi,potagerARecolter,maturationFruitsLegumes){
		super(name,compteBancaire);
		this._humeurElsa = humeurElsa;
		this._probaDiner = probaDiner;
		this._dinerServi = dinerServi;
		this._potagerARecolter = potagerARecolter;
		this._maturationFruitsLegumes = maturationFruitsLegumes;
	}
	
	//3 chances sur 10 que diner soit servi
	dinerServiEtPotager(){
		Elsa.probaDiner = Math.round(Math.random() * 9) + 1;
		if(Elsa.probaDiner < 3){
			Elsa.dinerServi = true;
			console.log("Elsa: Le diner est servi!");
		}
		else {
			Elsa.dinerServi = false;
		}
		

		Elsa.maturationFruitsLegumes = Math.round(Math.random() * 100);
		if(Elsa.maturationFruitsLegumes > 70){
			Elsa.potagerARecolter = true;
			console.log("Elsa: Le potager est prêt à être récolté!");
		}
		else {
			Elsa.potagerARecolter = false;
		}
	}
	
	lancerAssiette(){
		Elsa.changerValeurhumeur();
		if(Elsa.humeurElsa < 20 && Bob.localisation == "home"){
			console.log("lancé d'assiette d'Elsa sur Bob");
			console.log("Aiaiaiia");
		}
	}
	
	changerValeurhumeur(){
		Elsa.humeurElsa = Math.round(Math.random() * 141);
	}
	
	get humeurElsa(){
		return this._humeurElsa;
	}
	set humeurElsa(value){
		this._humeurElsa = value;
	}
	get probaDiner(){
		return this._probaDiner;
	}
	set probaDiner(value){
		this._probaDiner = value;
	}
	get dinerServi(){
		return this._dinerServi;
	}
	set dinerServi(value){
		this._dinerServi = value;
	}
	get maturationFruitsLegumes(){
		return this._maturationFruitsLegumes;
	}
	set maturationFruitsLegumes(value){
		this._maturationFruitsLegumes = value;
	}
	get potagerARecolter(){
		return this._potagerARecolter;
	}
	set potagerARecolter(value){
		this._potagerARecolter = value;
	}
}
class StatefemmeMineur {
	constructor(humeurElsa){
		this._EtathumeurElsa = humeurElsa;
	}
	get EtathumeurElsa(){
		return this._EtathumeurElsa;
	}
	set EtathumeurElsa(value){
		this._EtathumeurElsa = value;
	}
}
class StatePasserTempsSalleDeBain extends StatefemmeMineur {
	constructor(humeurElsa){
		super(humeurElsa);
	}
	seCoiffer(){
		console.log("Elsa se coiffe avec son beau peigne rose!");
	}
	seMettreParfum(){
		console.log("Elsa se parfume!");
	}
	essayerRobes(){
		console.log("Elsa essaye une robe!");
	}
}
class StateFaireTachesDomestiques extends StatefemmeMineur {
	constructor(humeurElsa){
		super(humeurElsa);
	}
	faireLaCuisine(){
		console.log("Elsa fait la cuisine!");
	}
	faireLeMenage(){
		console.log("Elsa fait le ménage!");
	}
	nettoyerVetements(){
		console.log("Elsa nettoye des vetements!");
	}
}

class Messagerie {
	constructor(){
		
	}
	
	envoyerMessage(dinerServi,potagerARecolter){
		const envoyeurMessage = {
			diner: dinerServi,
			potager: potagerARecolter
		};
		
		for(let propriete in envoyeurMessage){
			
			if(envoyeurMessage[propriete] == true){
				d1 = new Date();
				d1Milli = d1.getMilliseconds();
				//propriete renferme diner ou potager
				messageBob.receptionMessage(propriete,d1Milli);
			}
		}
		
	}
	
	receptionMessage(proprieteObjetEnCours,tempsRef){
		let tabProprietes = [];
		let tabTempsRef = [];
		let tempsMax = 0;
		let indicePropriete = 0;
		/*Les 2 états, diner ou potager peuvent être vrai, ou a quelques secondes d'ecart,
		il faut pouvoir prioriser celle qui a la duree de vie la plus longue en millisecondes,
		ce qui correspont à celle crée en premier.
		On crée 2 tab, une pour la propriété et une pour le temps de ref correspondant,
		elles seront au même indice dans leurs tab respectifs*/
		tabProprietes.push(proprieteObjetEnCours);
		tabTempsRef.push(tempsRef);
		
		for(let i = 0;i < tabTempsRef.length;i++){
			if(tabTempsRef[i] > tempsMax ){
				tempsMax = tabTempsRef[i];
				indicePropriete = i;
			}
		}
		
		switch(tabProprietes[indicePropriete]){
			case "diner": 
			BobEtat = new rentrerMaisonSeReposer(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);
			BobEtat.rentreALaMaisonPourDiner();
			break;
			case "potager": 
			BobEtat = new rentrerMaisonSeReposer(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);
			BobEtat.rentreALaMaisonRamasserPotager();
			break;
			default: console.log("error");
		}
		
	}
}
class Mineur extends Personne {
	constructor(name,sante,forceCoupDePoings,compteBancaire,nivSoif,nivFatigue,nivRichesse,localisation){
		super(name,sante,forceCoupDePoings,compteBancaire);
		this._nivSoif = nivSoif;
		this._nivFatigue = nivFatigue;
		this._nivRichesse = nivRichesse;
		this._localisation = localisation;
	}
	
	get nivSoif(){
		return this._nivSoif;
	}
	set nivSoif(value){
		
		if(value > -1){
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
		
		if(value > -1){
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
		
		if(value > -1){
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
			Elsa.dinerServiEtPotager();
			Elsa.lancerAssiette();
			messageElsa.envoyerMessage(Elsa.dinerServi,Elsa.potagerARecolter);
			Elsa.changerValeurhumeur();
			//alert("EtathumeurElsa:" + ElsaEtat.EtathumeurElsa);
			if(Elsa.humeurElsa >= 20 && Elsa.humeurElsa <= 80){
				//alert(Elsa.humeurElsa);
				//On envoi l'humeur de Elsa de la classe femme de mineur
				ElsaEtat = new StateFaireTachesDomestiques(Elsa.humeurElsa);
				//alert("EtathumeurElsa:" + ElsaEtat.EtathumeurElsa);
				
				/*dans l'instance ElsaEtat de la classe StateFaireTachesDomestiques c'est bien l'humeur
				de Elsa de la classe femme de mineur qui a été transmit, mais à la classe ElsaEtat,
				comme cette classe en hérite, et que la variable est dans le parent, on fait appel
				à une fonction qui la recupère, via super
				*/
				if(ElsaEtat.EtathumeurElsa > 20 && ElsaEtat.EtathumeurElsa <= 40){
					ElsaEtat.faireLaCuisine();
				}
				else if(ElsaEtat.EtathumeurElsa > 40 && ElsaEtat.EtathumeurElsa <= 60){
					ElsaEtat.faireLeMenage();
				}
				else if(ElsaEtat.EtathumeurElsa > 60 && ElsaEtat.EtathumeurElsa <= 80){
					ElsaEtat.nettoyerVetements();
				}
				else {
					
				}
			}
			else {
				ElsaEtat = new StatePasserTempsSalleDeBain(Elsa.humeurElsa);
				if(ElsaEtat.EtathumeurElsa > 80 && ElsaEtat.EtathumeurElsa <= 100){
					ElsaEtat.seCoiffer();
				}
				else if(ElsaEtat.EtathumeurElsa > 100 && ElsaEtat.EtathumeurElsa <= 120){
					ElsaEtat.seMettreParfum();
				}
				else if(ElsaEtat.EtathumeurElsa > 120 && ElsaEtat.EtathumeurElsa <= 140){
					ElsaEtat.essayerRobes();
				}
				else {
					
				}
			}
			
			//Nous sommes dans une methode de classe Mineur, dont Bob est l'instance en cours, on peut utiliser this.
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

let Bob = new Mineur("Bob",santeBob,coupDePoingsBob,compteBancaire,nivSoif,nivFatigue,nivRichesse,localisation);
let BobEtat = new State(Bob.nivSoif,Bob.nivFatigue,Bob.nivRichesse,Bob.localisation);

let Elsa = new FemmeMineur("Elsa",compteBancaire,humeurElsa,probaDiner,dinerServi,potagerARecolter,maturationFruitsLegumes);
let ElsaEtat = new StatefemmeMineur(Elsa.humeurElsa);

let messageElsa = new Messagerie();
let messageBob = new Messagerie();

let ivrogne = new Personne("L'ivrogne",santeIvrogne,15,200);

//Le première état devrait être creuserALaMine

while(Bob.compteBancaire < goldenRetreat && !BobEstMort){
	Bob.verifConditions();
}

if(Bob.compteBancaire > goldenRetreat){
	console.log("Bob a fait fortune!");
}
else{
	console.log("Bob is dead!");
}




