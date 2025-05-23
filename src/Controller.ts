import axiosService from "@/axios";
import {PostsByCategoryResponse} from "@/modules/posts_by_category/PostsByCategoryResponse";
import {PostsByCategoryRequest} from "@/modules/posts_by_category/PostsByCategoryRequest";
import {CountPostsByCategoriesResponse} from "@/modules/post_list_switcher/CountPostsByCategoriesResponse";
import {TagPickerRequest} from "@/modules/picker_tag/TagPickerRequest";
import {TagPickerResponse} from "@/modules/picker_tag/TagPickerResponse";
import {CountPostsByCategoriesRequest} from "@/modules/post_list_switcher/CountPostsByCategoriesRequest";

class Controller {
    public async getPostsByCategory(request: PostsByCategoryRequest): Promise<PostsByCategoryResponse> {
        try {
            const response = await axiosService
                .post<PostsByCategoryResponse>("post/by_category", request);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async countPostsByCategories(request: CountPostsByCategoriesRequest): Promise<CountPostsByCategoriesResponse> {
        try {
            const response = await axiosService
                .post<CountPostsByCategoriesResponse>("post/count", request);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getTagsForPicker(request: TagPickerRequest): Promise<TagPickerResponse> {
        try {
            const response = await axiosService
                .post<TagPickerResponse>("tags/refresh_picker", request);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new Controller();
