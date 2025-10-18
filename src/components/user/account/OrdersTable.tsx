import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Star,
} from "lucide-react";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { useReviewStore } from "@/store/useReviewStore";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image?: string;
  };
}

interface Order {
  id: string;
  createdAt: string;
  total: number;
  status?: string;
  items?: OrderItem[];
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod?: string;
  trackingNumber?: string;
}

interface OrdersTableProps {
  orders: Order[];
}

const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    processing: "bg-blue-100 text-blue-800 border-blue-300",
    shipped: "bg-purple-100 text-purple-800 border-purple-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-red-100 text-red-800 border-red-300",
  };
  return (
    statusColors[status.toLowerCase()] ||
    "bg-gray-100 text-gray-800 border-gray-300"
  );
};

const getStatusIcon = (status: string) => {
  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-4 h-4" />,
    processing: <Package className="w-4 h-4" />,
    shipped: <Truck className="w-4 h-4" />,
    delivered: <CheckCircle className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />,
  };
  return statusIcons[status.toLowerCase()] || <Package className="w-4 h-4" />;
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviewingProduct, setReviewingProduct] = useState<{
    productId: string;
    orderId: string;
    productName: string;
  } | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const { createReview } = useReviewStore();
  const { toast } = useToast();

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleReviewProduct = (
    productId: string,
    orderId: string,
    productName: string
  ) => {
    setReviewingProduct({ productId, orderId, productName });
    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = async (data: any) => {
    try {
      await createReview(data);
      toast({
        title: "Review submitted successfully",
        description: "Thank you for your feedback!",
      });
      setIsReviewDialogOpen(false);
      setReviewingProduct(null);
    } catch (error: any) {
      toast({
        title: "Failed to submit review",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  const canReview = (order: Order) => {
    // Only delivered orders can be reviewed
    return order.status?.toLowerCase() === "delivered";
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Orders Yet
        </h3>
        <p className="text-gray-600 mb-6">
          You haven't placed any orders yet. Start shopping to see your orders
          here.
        </p>
        <Button
          onClick={() => (window.location.href = "/listing")}
          className="px-6"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide mb-2">
            MY ORDERS
          </h2>
          <p className="text-gray-600">
            View and track your orders ({orders.length} total)
          </p>
        </div>

        {/* Mobile View - Cards */}
        <div className="block lg:hidden space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {canReview(order) && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                      <Star className="w-3 h-3 fill-green-600" />
                      <span>Can review products</span>
                    </div>
                  )}
                </div>
                <Badge
                  className={`${getStatusColor(
                    order.status || "pending"
                  )} flex items-center gap-1`}
                >
                  {getStatusIcon(order.status || "pending")}
                  <span className="capitalize">
                    {order.status || "Pending"}
                  </span>
                </Badge>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹ {order.total.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(order)}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden lg:block border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Items</TableHead>
                <TableHead className="font-semibold text-right">
                  Total
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      #{order.id.slice(0, 8).toUpperCase()}
                      {canReview(order) && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                          <Star className="w-3 h-3 fill-green-600" />
                          <span>Can review</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(
                        order.status || "pending"
                      )} flex items-center gap-1 w-fit`}
                    >
                      {getStatusIcon(order.status || "pending")}
                      <span className="capitalize">
                        {order.status || "Pending"}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {order.items?.length || 0} item(s)
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹ {order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                      className="flex items-center gap-2 ml-auto"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Order Details
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-semibold">
                    #{selectedOrder.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    className={`${getStatusColor(
                      selectedOrder.status || "pending"
                    )} flex items-center gap-1 w-fit mt-1`}
                  >
                    {getStatusIcon(selectedOrder.status || "pending")}
                    <span className="capitalize">
                      {selectedOrder.status || "Pending"}
                    </span>
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-bold text-lg">
                    ₹ {selectedOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">Order Items</h3>
                    {canReview(selectedOrder) && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Eligible for Review</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg"
                      >
                        {item.product?.image && (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="font-semibold">
                            ₹ {item.price.toFixed(2)}
                          </p>
                          {canReview(selectedOrder) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleReviewProduct(
                                  item.productId,
                                  selectedOrder.id,
                                  item.product?.name || "Product"
                                )
                              }
                              className="flex items-center gap-1"
                            >
                              <Star className="w-3 h-3" />
                              Review
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              {selectedOrder.shippingAddress && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Shipping Address
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">
                      {selectedOrder.shippingAddress.name}
                    </p>
                    <p className="text-gray-600">
                      {selectedOrder.shippingAddress.address}
                    </p>
                    <p className="text-gray-600">
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.state}{" "}
                      {selectedOrder.shippingAddress.postalCode}
                    </p>
                    <p className="text-gray-600">
                      {selectedOrder.shippingAddress.country}
                    </p>
                  </div>
                </div>
              )}

              {/* Tracking Info */}
              {selectedOrder.trackingNumber && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Tracking Information
                  </h3>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Tracking Number
                    </p>
                    <p className="font-mono font-semibold">
                      {selectedOrder.trackingNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Write a Review
            </DialogTitle>
            {reviewingProduct && (
              <p className="text-sm text-gray-600 mt-1">
                Reviewing: {reviewingProduct.productName}
              </p>
            )}
          </DialogHeader>

          {reviewingProduct && (
            <ReviewForm
              productId={reviewingProduct.productId}
              orderId={reviewingProduct.orderId}
              onSubmit={handleSubmitReview}
              onCancel={() => {
                setIsReviewDialogOpen(false);
                setReviewingProduct(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
