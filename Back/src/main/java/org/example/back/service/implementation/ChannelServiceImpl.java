package org.example.back.service.implementation;

import lombok.RequiredArgsConstructor;
import org.example.back.common.ApiResponse;
import org.example.back.dto.request.PatchChannelRequestDto;
import org.example.back.dto.request.PostChannelRequestDto;
import org.example.back.dto.response.*;
import org.example.back.entity.BelongChannelEntity;
import org.example.back.entity.ChannelEntity;
import org.example.back.entity.UserEntity;
import org.example.back.repository.BelongChannelRepository;
import org.example.back.repository.ChannelRepository;
import org.example.back.repository.UserRepository;
import org.example.back.service.ChannelService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.OK;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final BelongChannelRepository belongChannelRepository;

    @Override
    public ApiResponse<PostChannelResponseDto> postChannel(String userEmail, PostChannelRequestDto dto) {

        PostChannelResponseDto data = null;
        ChannelEntity channelEntity = null;
        Optional<UserEntity> userEntity = userRepository.findByUserEmail(userEmail);
        BelongChannelEntity belongChannelEntity = new BelongChannelEntity();

        try{
            channelEntity = new ChannelEntity(dto);
            channelRepository.save(channelEntity);

            if(!userEntity.isPresent()) return new ApiResponse("로그인이 필요합니다.", 500, null);

            belongChannelEntity.setChannelIdx(channelEntity.getChannelIdx());
            belongChannelEntity.setUserIdx(userEntity.get().getUserIdx());
            belongChannelEntity.setIsAdmin(0);

            belongChannelRepository.save(belongChannelEntity);
            data = new PostChannelResponseDto(channelEntity);

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("채널 생성 에러", 500, null);
        }

        return new ApiResponse("채널 생성 성공", OK.value(), data);
    }

    @Override
    public ApiResponse<GetChannelResponseDto> getChannel(int channelIdx) {

        GetChannelResponseDto data = null;
        ChannelEntity channelEntity = channelRepository.findByChannelIdx(channelIdx);

        try{

            if(channelEntity.getChannelIsDelete() == 1) return new ApiResponse("존재하지 않는 채널입니다.", 500, null);
            data = new GetChannelResponseDto(channelEntity);

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("채널 조회 에러", 500, null);
        }

        return new ApiResponse("채널 조회 성공", 500, data);
    }
    @Override
    public ApiResponse<GetChannelListResponseDto> getChannelList() {

    List<GetChannelListResponseDto> data = null;

    try{

        List<ChannelEntity> channelList = channelRepository.findByChannelIsDeleteOrderByChannelDate(0);

        data = GetChannelListResponseDto.addList(channelList);

    }catch (Exception e){
        e.printStackTrace();
        return new ApiResponse("채널 리스트 조회 에러", 500, null);
    }

        return new ApiResponse("채널 리스트 조회 성공", OK.value(), data);
    }

    @Override
    public ApiResponse<PatchChannelResponseDto> patchChannel(int channelId, PatchChannelRequestDto dto) {

        PatchChannelResponseDto data = null;
        ChannelEntity channelEntity = channelRepository.findByChannelIdx(channelId);

        try{

            String channelName = dto.getChannelName();
            String channelIntro = dto.getChannelIntro();
            int channelMax = dto.getChannelMax();

            channelEntity.setChannelName(channelName);
            channelEntity.setChannelIntro(channelIntro);
            channelEntity.setChannelMax(channelMax);

            channelRepository.save(channelEntity);
            data = new PatchChannelResponseDto(channelEntity);

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("채널 수정 에러", 500, null);
        }

        return new ApiResponse("채널 수정 성공", OK.value(), data);
    }

    @Override
    public ApiResponse<?> deleteChannel(int channelId) {

        ChannelEntity channelEntity = channelRepository.findByChannelIdx(channelId);

        try{

            channelEntity.setChannelIsDelete(1);
            channelRepository.save(channelEntity);

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("채널 삭제 에러", 500, null);
        }
        return new ApiResponse("채널 삭제 성공", OK.value(), "채널 삭제");
    }

    @Override
    public ApiResponse<GetChannelMemberResponseDto> getChannelMember(int channelIdx) {

        List<GetChannelMemberResponseDto> data = null;

        try{

        List<BelongChannelEntity> bchEntity = belongChannelRepository.findByChannelIdx(channelIdx);
            System.out.println(bchEntity);

//                    list.add(userEntity);
//                }
//            }

            List<UserEntity> userEntityList = new ArrayList<>();

            for(BelongChannelEntity bch : bchEntity){

                UserEntity userEntity = userRepository.findByUserIdx(bch.getUserIdx());
                userEntityList.add(userEntity);
            }

            data = GetChannelMemberResponseDto.addList(userEntityList);

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("채널 멤버 조회 에러", 500, null);
        }

        return new ApiResponse("채널 멤버 조회 성공", 500, data);
    }
}
