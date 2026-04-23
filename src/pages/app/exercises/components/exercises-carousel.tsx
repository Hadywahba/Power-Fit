// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from '@/components/ui/carousel';
// import type { CarouselApi } from '@/components/ui/carousel';


// export default function ExercisesCarousel() {
//   return (
//     <>
//       {' '}
//       <Carousel
//         setApi={setApi}
//         opts={{
//           align: 'start',
//           containScroll: 'trimSnaps',
//         }}
//         className="w-full"
//       >
//         <CarouselContent>
//           {pages.map((page, pageIndex) => (
//             <CarouselItem key={pageIndex} className="basis-full">
//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
//                 {page.map((muscle) => (
//                   <MuscleCard
//                     key={muscle._id}
//                     muscle={muscle}
//                     to={`${cardBasePath}/${muscle._id}`}
//                   />
//                 ))}
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//     </>
//   );
// }
