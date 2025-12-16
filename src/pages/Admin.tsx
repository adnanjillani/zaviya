import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  area: string;
  status: string;
}

interface PreOrder {
  id: number;
  name: string;
  email: string;
  phone: string;
  pickupTime: string;
  items: { [key: string]: number };
  total: number;
  status: string;
}

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [preOrders, setPreOrders] = useState<PreOrder[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const savedPreOrders = JSON.parse(localStorage.getItem("preorders") || "[]");
    setBookings(savedBookings);
    setPreOrders(savedPreOrders);
  };

  const updateBookingStatus = (id: number, newStatus: string) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    toast.success("Booking status updated");
  };

  const updateOrderStatus = (id: number, newStatus: string) => {
    const updatedOrders = preOrders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setPreOrders(updatedOrders);
    localStorage.setItem("preorders", JSON.stringify(updatedOrders));
    toast.success("Order status updated");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage bookings and pre-orders</p>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="bookings">Table Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="preorders">Pre-Orders ({preOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            {bookings.length === 0 ? (
              <Card className="shadow-elegant">
                <CardContent className="py-12">
                  <p className="text-center text-muted-foreground">No bookings yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="shadow-elegant">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{booking.name}</CardTitle>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Contact</p>
                          <p>{booking.email}</p>
                          <p>{booking.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Reservation Details</p>
                          <p>Date: {booking.date}</p>
                          <p>Time: {booking.time}</p>
                          <p>Guests: {booking.guests}</p>
                          <p>Area: <span className="capitalize">{booking.area}</span></p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, "confirmed")}
                          disabled={booking.status === "confirmed"}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => updateBookingStatus(booking.id, "completed")}
                          disabled={booking.status === "completed"}
                        >
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateBookingStatus(booking.id, "cancelled")}
                          disabled={booking.status === "cancelled"}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="preorders">
            {preOrders.length === 0 ? (
              <Card className="shadow-elegant">
                <CardContent className="py-12">
                  <p className="text-center text-muted-foreground">No pre-orders yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {preOrders.map((order) => (
                  <Card key={order.id} className="shadow-elegant">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{order.name}</CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Contact</p>
                          <p>{order.email}</p>
                          <p>{order.phone}</p>
                          <p className="mt-2">Pickup: {new Date(order.pickupTime).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Order Items</p>
                          <div className="space-y-1">
                            {Object.entries(order.items).map(([itemId, quantity]) => (
                              <p key={itemId} className="text-sm">
                                Item #{itemId} x{quantity}
                              </p>
                            ))}
                          </div>
                          <p className="font-bold mt-2 text-secondary">Total: ${order.total}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "confirmed")}
                          disabled={order.status === "confirmed"}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => updateOrderStatus(order.id, "completed")}
                          disabled={order.status === "completed"}
                        >
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                          disabled={order.status === "cancelled"}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
