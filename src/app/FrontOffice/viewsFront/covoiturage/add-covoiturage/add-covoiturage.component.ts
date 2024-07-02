import { Component, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Assurez-vous que ces imports sont présents
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-covoiturage',
  templateUrl: './add-covoiturage.component.html',
  styleUrls: ['./add-covoiturage.component.css']
})
export class AddCovoiturageComponent implements OnInit{
  covoiturage: Covoiturage = new Covoiturage();
  form!: FormGroup; 
  tunisianCities: string[] = [
    "Tunis",
    "Sfax",
    "Sousse",
    "Kairouan",
    "Bizerte",
    "Gabès",
    "Ariana",
    "Gafsa",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Tataouine",
    "Tozeur",
    "Zaghouan",
    "Beja",
    "BenArous",
    "Kasserine",
    "Kef",
    "Mahdia",
    "Manouba",
    "SidiBouzid",
    "Siliana",
    "Zarzis",
    "Kébili"
  ];
  

  constructor(private router:Router,private covoiturageService: CovoiturageService,private formBuilder: FormBuilder) { }

ngOnInit(): void {
  this.form = this.formBuilder.group({
    // Définissez vos champs et leurs validateurs ici
    nombre_placecov: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
    lieu_depart: ['', [Validators.required, Validators.pattern('[A-Za-z\s]+')]],
    destination: ['', [Validators.required, Validators.pattern('[A-Za-z\s]+')]],
    date_depart: ['', Validators.required]    ,
    description: ['', Validators.required]
  });
}
userId = localStorage.getItem('angular17TokenUserId');
id!: number ;

getId(){
   if(this.userId ){
   this.id=parseFloat(this.userId)
}
}
onSubmit(): void {
  this.getId()
  console.log(this.id)
  // Check if the form is valid
  if (this.form.valid) {
    // Check if the 'nombre_placecov' input value is between 1 and 4
    
      // If valid, proceed with submitting the form
      this.covoiturageService.addCovoiturage(this.covoiturage,this.id).subscribe(
        data => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Carpooling added successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          console.log('Covoiturage added successfully!', data);
        },
        error => {
          console.error('Error adding covoiturage:', error);
        }
      );
     this.router.navigate(['/user/listCovoiturage'])
      // If 'nombre_placecov' is not between 1 and 4, show an error message or handle it accordingly
      console.error('Nombre de places invalid. Must be between 1 and 4.');
    
  } else {
    // If the form is invalid, do not submit
    console.error('Form is invalid. Cannot submit.');
  }
}

  Listfront()
  {
    this.router.navigate(['/user/listCovoiturage']);
  }
  
}
