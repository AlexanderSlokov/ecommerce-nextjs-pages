import axios from 'axios';
import { uploadImages } from '../components/ProductForm';
import jest from "node:jest";


// Mock the axios.post method
jest.mock('axios', () => ({
    post: jest.fn(),
}));

// Mock the state update functions
const setIsUpLoading = jest.fn();
const setImages = jest.fn();

describe('uploadImages Function Initialization Testing', () => {
    it('initializes correctly when an event is triggered', async () => {
        // Simulate the event object with files
        const files = [
            new File([''], 'test-image1.png', { type: 'image/png' }),
            new File([''], 'test-image2.png', { type: 'image/png' }),
        ];
        const mockEvent = {
            target: {
                files: files,
            },
        };

        // Mock the axios.post response
        axios.post.mockResolvedValue({ data: { links: ['link1', 'link2'] } });

        // Call the function with the mock event
        await uploadImages(mockEvent, setIsUpLoading, setImages);

        // Check if the files are correctly retrieved from the event
        expect(mockEvent.target.files).toEqual(files);

        // Check if setIsUpLoading is called with true
        expect(setIsUpLoading).toHaveBeenCalledWith(true);
    });
});
