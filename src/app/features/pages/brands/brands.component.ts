import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandService } from '../../../core/services/brand.service';
import { Brand } from '../../../core/interfaces/Brand';
import { CardItemComponent } from "../../../shared/components/ui/card-item/card-item.component";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brandList: Brand[] = [];
  getAllbrandSub!: Subscription;
  private readonly _brandservice = inject(BrandService);

  ngOnInit(): void {
    this.getBrand();
  }

  ngOnDestroy(): void {
    this.getAllbrandSub?.unsubscribe();
  }

  getBrand(): void {
    this.getAllbrandSub = this._brandservice.getAllBrands().subscribe({
      next: (res) => {
        this.brandList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
