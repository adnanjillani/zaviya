import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UtensilsCrossed, CalendarCheck, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Zaviya Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 warm-overlay" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
            Welcome to Zaviya
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
            Where Culinary Excellence Meets Exceptional Service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="hero" size="lg">
                Book a Table
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="secondary" size="lg">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Zaviya?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-elegant transition-smooth hover:shadow-glow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-full">
                    <UtensilsCrossed className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Three Cuisines</h3>
                  <p className="text-muted-foreground">
                    Enjoy authentic Italian, Pakistani, and Chinese dishes prepared by expert chefs
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant transition-smooth hover:shadow-glow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-full">
                    <CalendarCheck className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Easy Booking</h3>
                  <p className="text-muted-foreground">
                    Reserve your preferred table area - Casual, Family, or Executive - in seconds
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant transition-smooth hover:shadow-glow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-full">
                    <ShoppingBag className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Pre-Order Food</h3>
                  <p className="text-muted-foreground">
                    Order ahead and have your meal ready when you arrive - no waiting
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready for an Unforgettable Dining Experience?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Book your table now and discover why Zaviya is the city's premier dining destination
          </p>
          <Link to="/booking">
            <Button variant="secondary" size="lg">
              Make a Reservation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
