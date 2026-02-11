import { Building2, Footprints, FlagTriangleRight, Pencil } from 'lucide-react'
import React from 'react'
import Avtar from './Avtar';
import PhotoViewer from './PhotoViewer';
import { useNavigate , Link} from 'react-router';
function TourCard({ _id, title, description, cites, photos, user, startDate, endDate }) {
    const { name, email , _id: userId} = user;
    const navigate=useNavigate();
    return (
        <div className="border relative bg-white border-gray-200 rounded-xl p-4 m-4 shadow-sm md:hover:shadow-lg transition-shadow duration-300">

             <Link to={`/tours/edit/${_id}`} className="absolute right-2 top-2 cursor-pointer">
              <span className='absolute right-2 top-2 cursor-pointer'><Pencil size={18} /></span>
              </Link>
            <h2 className="text-2xl font-bold text-gray-800">
                {title}
            </h2>

            <p className="text-gray-600 text-sm mt-1 ">
                {description}
            </p>

            <div className="text-sm text-gray-500 mt-3 flex flex-wrap items-center gap-2">
                <Footprints size={16} />
                <span>
                    Started: {new Date(startDate).toLocaleDateString()}
                </span>

                <FlagTriangleRight size={16} />
                <span>
                    Ended: {new Date(endDate).toLocaleDateString()}
                </span>
            </div>

            <div className="flex items-start gap-2 mt-3">
                <Building2 size={16} className="mt-1 text-gray-500" />

                <div className="flex flex-wrap gap-2">
                    {cites.map((city) => (
                        <span
                            key={city}
                            className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium hover:bg-indigo-100 transition"
                        >
                            {city}
                        </span>
                    ))}
                </div>
            </div>

            <div className="w-full overflow-x-auto py-3 mt-2">
                <div className="flex gap-3 min-w-max">
                    {photos?.map((photo, index) => (
                        <PhotoViewer
                            key={`${_id}-photo-${index}`}
                            imgUrl={photo}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-100 mt-4 pt-3"></div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="font-medium text-gray-500">Posted by</span>

                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                    <Avtar name={name} size="sm" />
                    <span className="font-medium text-gray-700">{name}</span>
                </div>
            </div>

        </div>
    );
}

export default TourCard;