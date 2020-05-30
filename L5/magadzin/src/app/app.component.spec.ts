import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should have "magadzin" as title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('magadzin');
    });

    it('should render header', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.header h1').textContent.toLowerCase()).toContain('magadzin');
    });

    it('should render navigation bar', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.nav')).toBeTruthy();
    });

    it('should render "Main" in navigation bar, which links to URL "/"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(
            compiled
                .querySelectorAll('.nav a')[0]
                .getAttribute('routerLink')
        ).toContain('/');
    });

    it('should render "Buy" in navigation bar, which links to URL "/catalog"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(
            compiled
                .querySelectorAll('.nav a')[1]
                .getAttribute('routerLink')
        ).toContain('/catalog');
    });

    it('should render "Contact" in navigation bar, which links to URL "/contact"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(
            compiled
                .querySelectorAll('.nav a')[2]
                .getAttribute('routerLink')
        ).toContain('/contact');
    });

    it('should render "Log In" in navigation bar, which links to URL "/login"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(
            compiled
                .querySelectorAll('.nav a')[3]
                .getAttribute('routerLink')
        ).toContain('/login');
    });

    it('should render "Log In" in the right corner of nav', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(
            window.getComputedStyle(compiled.querySelectorAll('.nav a')[3])
                .getPropertyValue("float")
        ).toContain('right');
    });

});
