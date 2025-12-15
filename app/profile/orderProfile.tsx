'use client';
import CustomCard from '@/components/customCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { UserData } from '@/entities/auth';
import { OrderRes } from '@/entities/resto';
import { useLoginUser } from '@/hooks/checkLoginUser';
import { useAddReview } from '@/hooks/reviewMutation';
import { getOrder } from '@/services/resto.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Search, Star } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { formatRupiah } from '../[id]/neededHook';
import { statusOrder } from '../constants/statusOrder';

const OrderPage = () => {
  const [statusView, setStatus] = useState('done');
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const user: UserData | null = useLoginUser();
  const { mutateAsync: addReview } = useAddReview();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['myOrder', statusView, page],
      queryFn: () => getOrder(page, statusView, user!.token),
      initialPageParam: 1,

      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.data.pagination || {};
        return page < totalPages ? page + 1 : undefined;
      },
    });

  const myOrder: OrderRes[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.orders) ?? [];
  }, [data]);

  const handleReview = async (
    transactionId: string,
    restaurantId: number,
    menuIds: number[]
  ) => {
    try {
      await addReview({
        transactionId: transactionId,
        restaurantId: restaurantId,
        star: Number(rating),
        comment: comment,
        menuIds: menuIds,
      });
      setRating(0);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='flex w-full flex-col gap-4 md:gap-6'>
        <h3 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
          My Orders
        </h3>

        <div className='relative md:w-[598px]'>
          <Input
            placeholder='Search'
            type='text'
            className='rounded-full indent-6 md:rounded-full'
          />
          <Search
            size={20}
            color='#E9EAEB'
            className='absolute top-1/2 left-2 -translate-y-1/2'
          />
        </div>

        {/* Status */}
        <div className='flex items-center gap-2 md:gap-3'>
          <h6 className='text-sm leading-7 font-bold tracking-tight md:text-lg md:leading-8'>
            Status
          </h6>
          <div className='flex w-full gap-2 overflow-x-auto overflow-y-hidden'>
            {statusOrder.map((status) => (
              <span
                key={status}
                className={`md:text-md flex h-10 items-center justify-center rounded-[100px] border px-4 py-2 text-sm leading-7 font-semibold tracking-tight md:h-11 md:leading-[30px] ${statusView === status.trim().toLowerCase() ? 'border-primary-100 text-primary-100 bg-[#FFECEC]' : 'border-neutral-300'}`}
                onClick={() => setStatus(status.trim().toLowerCase())}
              >
                {status}
              </span>
            ))}
          </div>
        </div>
        {myOrder.length <= 0 && !isLoading && (
          <div className='flex h-[100px] items-center justify-center'>
            <p className='text-md text-primary-100 leading-[30px] font-extrabold md:text-lg md:leading-8 md:tracking-tight'>
              No Order Found
            </p>
          </div>
        )}
        {isLoading && (
          <div className='flex h-[100px] items-center justify-center'>
            <Spinner className='size-[20px] md:size-[40px]' />
          </div>
        )}

        {/* listOrder */}
        {myOrder.map((item) =>
          item.restaurants.map((resto, index) => (
            <CustomCard
              key={index}
              className='flex flex-col gap-3 p-4 md:gap-5 md:p-5'
            >
              <div className='flex items-center gap-1 md:gap-2'>
                <Image
                  src={resto.restaurant.logo}
                  width={32}
                  height={32}
                  alt='store'
                />
                <h4 className='text-md leading-[30px] font-bold tracking-tight md:text-lg md:leading-8 md:tracking-tighter'>
                  {resto.restaurant.name}
                </h4>
              </div>

              {resto.items.map((menu, i: number) => (
                <div key={i} className='flex justify-between'>
                  <div className='flex gap-4'>
                    <Image
                      src={menu.image}
                      width={100}
                      height={100}
                      alt={menu.menuName}
                      className='size-16 rounded-xl md:size-20'
                    />
                    <div className='flex flex-col'>
                      <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                        {menu.menuName}
                      </p>
                      <p className='text-md leading-[30px] font-extrabold tracking-tight md:text-lg md:leading-8'>
                        {menu.quantity} x {formatRupiah(menu.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <hr className='border-neutral-300' />
              {/* Total Price & Give Review */}
              <div className='flex flex-col items-center gap-3 md:flex-row md:justify-between'>
                <div className='flex flex-col'>
                  <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tight'>
                    Total
                  </p>
                  <p className='text-md leading-[30px] font-extrabold md:text-xl md:leading-[34px] md:tracking-tight'>
                    {formatRupiah(item.pricing.totalPrice)}
                  </p>
                </div>

                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button className='bg-primary-100 md:text-md h-11 w-full text-sm leading-7 font-bold text-white md:h-12 md:w-60 md:leading-[30px]'>
                        Give Review
                      </Button>
                    </DialogTrigger>
                    <DialogTitle hidden></DialogTitle>
                    <DialogContent className='max-w-[361px] sm:max-w-[439px]'>
                      <h2 className='md:text-display-xs text-xl leading-[34px] font-extrabold md:leading-[text-display-xs-height]'>
                        Give Review
                      </h2>

                      <div className='flex flex-col items-center justify-center text-center'>
                        <h3 className='text-md leading-[30px] font-extrabold'>
                          Give Rating
                        </h3>
                        <div className='flex items-center gap-1'>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`${
                                index < rating
                                  ? 'fill-accent-yellow'
                                  : 'fill-neutral-300'
                              } size-10 md:size-12`}
                              color='transparent'
                              onClick={() => setRating(index + 1)}
                            />
                          ))}
                        </div>
                      </div>

                      <Textarea
                        placeholder='Please share your thoughts about our service!'
                        className='h-[235px]'
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            className='bg-primary-100 md:text-md h-11 w-full text-sm leading-7 font-bold text-white md:h-12 md:leading-[30px]'
                            onClick={() =>
                              handleReview(
                                item.transactionId,
                                resto.restaurant.id,
                                resto.items.map((menu) => menu.menuId)
                              )
                            }
                          >
                            Send
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </CustomCard>
          ))
        )}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {page > 1 && (
                <PaginationPrevious onClick={() => setPage(page - 1)} />
              )}
            </PaginationItem>
            <PaginationItem>
              {hasNextPage && (
                <PaginationNext onClick={() => setPage(page + 1)} />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default OrderPage;
