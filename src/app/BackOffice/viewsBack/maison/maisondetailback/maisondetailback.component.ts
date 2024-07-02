import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contratlocation } from 'src/app/Models/contratlocation';
import { Maison } from 'src/app/Models/maison';
import { ContratlocationService } from 'src/app/Services/contratlocation.service';
import { MaisonService } from 'src/app/Services/maison.service';
import Swiper from 'swiper';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-maisondetailback',
  templateUrl: './maisondetailback.component.html',
  styleUrls: ['./maisondetailback.component.css']
})
export class MaisondetailbackComponent {
  maison: Maison = new Maison();
  currentImageIndex: number = 0;
  swiper: Swiper | undefined;
  private autoChangeInterval: any;
  showAddContratDialog: boolean = false;
  newContrat: Contratlocation = new Contratlocation();
  newMaison: Maison = new Maison();
  Username !: String;
  idM!:number;
  iduser!:number;
  userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;

  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}
  
  openAddContratDialog(iduser : number,id:number,username: String) {
    this.showAddContratDialog = true;
    this.iduser=iduser;
    this.idM=id;
    this.Username=username
    console.log(this.Username);
    console.log(this.idM);

  }
  closeAddContratDialog() {
    this.showAddContratDialog = false;
  }
  constructor(private route: ActivatedRoute, private maisonservice: MaisonService,private contratservice: ContratlocationService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const maisonId = params['id']; 
      this.maisonservice.getMaisonById(maisonId).subscribe((maison: Maison) => {
        this.maison = maison; 
        if (this.maison.user) {
          console.log(this.maison.user.name); 
        }
      });
    });

    // Simuler le chargement des images toutes les 2 secondes
    this.autoChangeInterval = setInterval(() => {
      this.showNextImage();
    }, 2000);
    this.initSwiper();


  }
  
  showNextImage(): void {
    if (this.maison.images && this.maison.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.maison.images.length;
    }
  }
  initSwiper(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'coverflow', // Mode coverflow pour afficher une seule diapositive
      centeredSlides: true, // Centrer l'image principale
      slidesPerView: 1, // Nombre d'images à afficher
      spaceBetween: 30, // Espace entre les images
      coverflowEffect: {
        rotate: 0, // Désactiver la rotation des images
        stretch: 100, // Étirer les images
        depth: 200, // Profondeur des images
        modifier: 1, // Modificateur
        slideShadows: true, // Afficher les ombres
      },
      autoplay: {
        delay: 2000, // Changement toutes les 2 secondes
        disableOnInteraction: false,
      }
    });
  }

  showImage(index: number): void {
    this.currentImageIndex = index;
    clearInterval(this.autoChangeInterval); // Arrêter l'intervalle lorsque vous cliquez sur une image floue
  }
  refuserDemandeur(maisonId: number, iduser: number): void {
    this.maisonservice.supprimerDemandeur(maisonId, iduser)
      .subscribe(() => {
        console.log('Demandeur supprimé avec succès.');
        console.log(iduser)
        
        // Après la suppression, mettez à jour la liste des demandeurs localement
        this.maison.demandeurs = this.maison.demandeurs.filter(demandeur => demandeur.id !== iduser);
      }, (error) => {
        console.error('Erreur lors de la suppression du demandeur : ', error);
      });
  }

  onSubmitContrat() {
    this.contratservice.addContratByUserAndMaison(this.newContrat, this.iduser, this.maison.id_maison).subscribe(
      () => {
        Swal.fire('Success!', 'Contrat de colocation ajouté avec succès', 'success');
  
        // Call the function to remove the user after successfully adding the contract
        this.refuserDemandeur(this.maison.id_maison, this.iduser);
  
        // Decrement the number of available spots
        this.maison.nbrplacedispo--;
  
        // Update the maison in the database
        /*this.maisonservice.updateMaison(this.maison).subscribe(() => {
          console.log('Nombre de places disponibles mis à jour avec succès.');
        }, (error) => {
          console.error('Erreur lors de la mise à jour du nombre de places disponibles : ', error);
        });*/
  
        this.generatePDF();
        window.location.reload();
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          html: 'Erreur lors de l\'ajout du contrat de colocation <span style="color: grey;"><br>Ce colocataire a signé un autre contrat</span>',
          icon: 'error'
        });
      }
    );
  
    console.log(this.newContrat);
  }
  
  
  

  generatePDF() {
    const doc = new jsPDF();
  
    // Définir les marges et la largeur de la page
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Définir la position initiale du texte
    let y = margin;
  
    // Titre du contrat au centre de la page
    const title = 'Contrat de Location';
    const titleWidth = doc.getStringUnitWidth(title) * 24 / doc.internal.scaleFactor; // Taille de police 24
    const titleX = (pageWidth - titleWidth) / 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor("#FF0000"); // Rouge
    doc.text(title, titleX, y);
    y += 30; // Augmenter la position y pour le texte suivant
    
    // Informations sur le contrat
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor("#333333"); // Noir
    doc.text(`Date de début: ${this.newContrat.date_debut}`, margin, y);
    y += 10;
    doc.text(`Date de fin: ${this.newContrat.date_fin}`, margin, y);
    y += 10;
    doc.text(`Colocataire: ${this.Username}`, margin, y);
    y += 20; // Augmenter la position y pour le texte suivant
  
    // Ajouter une ligne de séparation
    doc.setLineWidth(0.5);
    doc.setDrawColor("#FF0000"); // Rouge
    doc.line(margin, y, pageWidth - margin, y);
    y += 5; // Augmenter la position y pour le texte suivant
  
    // Ajouter un paragraphe de texte descriptif
    const description = `Le présent contrat de location établit les termes et les conditions de la location de la maison entre les parties impliquées. Toute violation des termes du contrat peut entraîner des conséquences légales.`;
    doc.setFontSize(12);
    doc.setTextColor("#333333"); // Noir
    doc.text(description, margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 40; // Augmenter la position y pour le texte suivant
  
    // Ajouter une note de bas de page
    doc.setFontSize(10);
    doc.setTextColor("#757575"); // Gris
    doc.text('Félicitations! Vous venez de signer un contrat de location. Bienvenue chez vous!', margin, doc.internal.pageSize.getHeight() - margin);
  
    // Enregistrer le PDF avec un nom de fichier spécifié
    doc.save('contrat_location.pdf');
  }
  
  

}
