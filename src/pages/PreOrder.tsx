import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { MinusCircle, PlusCircle } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

const menuItems: MenuItem[] = [
  { id: "1", name: "Spaghetti Carbonara", price: 18, category: "Italian" },
  { id: "2", name: "Margherita Pizza", price: 16, category: "Italian" },
  { id: "3", name: "Chicken Biryani", price: 15, category: "Pakistani" },
  { id: "4", name: "Seekh Kabab", price: 14, category: "Pakistani" },
  { id: "5", name: "Dim Sum Platter", price: 16, category: "Chinese" },
  { id: "6", name: "Kung Pao Chicken", price: 17, category: "Chinese" },
];

const PreOrder = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    pickupTime: "",
  });

  const [orderItems, setOrderItems] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (itemId: string, change: number) => {
    setOrderItems((prev) => {
      const newQuantity = (prev[itemId] || 0) + change;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const calculateTotal = () => {
    return Object.entries(orderItems).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find((m) => m.id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.pickupTime) {
      toast.error("Please fill in all customer details");
      return;
    }

    if (Object.keys(orderItems).length === 0) {
      toast.error("Please select at least one item");
      return;
    }

    // Store order in localStorage
    const orders = JSON.parse(localStorage.getItem("preorders") || "[]");
    const newOrder = {
      id: Date.now(),
      ...customerInfo,
      items: orderItems,
      total: calculateTotal(),
      status: "pending",
    };
    orders.push(newOrder);
    localStorage.setItem("preorders", JSON.stringify(orders));

    toast.success("Order placed successfully! We'll have it ready for you.");

    // Reset form
    setCustomerInfo({ name: "", email: "", phone: "", pickupTime: "" });
    setOrderItems({});
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pre-Order Food</h1>
          <p className="text-xl text-muted-foreground">
            Order ahead and have your meal ready when you arrive
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Select Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Italian", "Pakistani", "Chinese"].map((category) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-3 text-secondary">{category}</h3>
                    <div className="space-y-3">
                      {menuItems
                        .filter((item) => item.category === category)
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">${item.price}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={!orderItems[item.id]}
                              >
                                <MinusCircle className="h-5 w-5" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {orderItems[item.id] || 0}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <PlusCircle className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Pickup Time</Label>
                    <Input
                      id="pickupTime"
                      type="datetime-local"
                      value={customerInfo.pickupTime}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, pickupTime: e.target.value })}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Place Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-elegant sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(orderItems).length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No items selected</p>
                ) : (
                  <>
                    <div className="space-y-2">
                      {Object.entries(orderItems).map(([itemId, quantity]) => {
                        const item = menuItems.find((m) => m.id === itemId);
                        if (!item) return null;
                        return (
                          <div key={itemId} className="flex justify-between text-sm">
                            <span>
                              {item.name} x{quantity}
                            </span>
                            <span>${item.price * quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-secondary">${calculateTotal()}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;
