import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-maisondetail',
  templateUrl: './maisondetail.component.html',
  styleUrls: ['./maisondetail.component.css']
})
export class MaisondetailComponent {
  maison: Maison = new Maison();
  currentImageIndex: number = 0;
  swiper: Swiper | undefined;
  private autoChangeInterval: any;
  constructor(private route: ActivatedRoute, private maisonservice: MaisonService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const maisonId = params['id']; // Récupérer l'ID de la maison depuis les paramètres de l'URL
      // Utiliser le service pour récupérer les détails de la maison en fonction de l'ID
      this.maisonservice.getMaisonById(maisonId).subscribe((maison: Maison) => {
        this.maison = maison; // Affecter les détails de la maison à la variable maison
        console.log(maison);
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
  



}