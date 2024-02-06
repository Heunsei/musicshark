package org.example.back.Channel.service.implementation;

import lombok.RequiredArgsConstructor;
import org.example.back.Channel.dto.response.*;
import org.example.back.common.ApiResponse;
import org.example.back.Channel.dto.request.PatchChannelRequestDto;
import org.example.back.Channel.dto.request.PostChannelRequestDto;
import org.example.back.Channel.entity.BelongChannelEntity;
import org.example.back.Channel.entity.ChannelEntity;
import org.example.back.User.entity.UserEntity;
import org.example.back.Channel.repository.BelongChannelRepository;
import org.example.back.Channel.repository.ChannelRepository;
import org.example.back.User.repository.TierRepository;
import org.example.back.User.repository.UserRepository;
import org.example.back.Channel.service.ChannelService;
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
    private final TierRepository tierRepository;

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

        List<ChannelEntity> channelList = channelRepository.findByChannelIsDeleteOrderByChannelDateDesc(0);

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

    @Override
    public ApiResponse<?> inviteMember(int channelIdx, int userIdx, String userEmail) {

        GetChannelResponseDto data = null;

        try{
            ChannelEntity channelEntity = channelRepository.findByChannelIdx(channelIdx);
            Optional<UserEntity> userEntity = userRepository.findByUserEmail(userEmail); // 방장 권한 확인용

            int adminUserIdx = userEntity.get().getUserIdx();

            // 가입 그룹 유저 인덱스, 권한
            BelongChannelEntity belongChannelEntity = belongChannelRepository.findTopByChannelIdx(channelIdx);
            int belongChannelAdminUserIdx = belongChannelEntity.getUserIdx();
            int belongChannelAdmin = belongChannelEntity.getIsAdmin();

            System.out.println(adminUserIdx + " / " + belongChannelAdminUserIdx + " / " + belongChannelAdmin);
            if(adminUserIdx != belongChannelAdminUserIdx || belongChannelAdmin != 0){
                return new ApiResponse("초대 권한이 없습니다.", 500, null);
            }

            int curMember = channelEntity.getChannelCur();

            if(curMember+1 > channelEntity.getChannelMax()) {
                return new ApiResponse("채널에 더 이상 멤버를 초대할 수 없습니다.", 500, null);
            }
            List<BelongChannelEntity> bchList = belongChannelRepository.findByChannelIdx(channelIdx);
            for(BelongChannelEntity bch : bchList){
                if(bch.getUserIdx() == userIdx){
                    return new ApiResponse("이미 참여된 유저입니다.", 500, null);
                }
            }

            channelEntity.setChannelCur(curMember+1);
            channelRepository.save(channelEntity);

            BelongChannelEntity belongChannelEntityAdd = new BelongChannelEntity();
            belongChannelEntityAdd.setChannelIdx(channelIdx);
            belongChannelEntityAdd.setUserIdx(userIdx);
            belongChannelEntityAdd.setIsAdmin(1);

            belongChannelRepository.save(belongChannelEntityAdd);

            data = new GetChannelResponseDto(channelEntity);

        }catch (Exception e){
            e.printStackTrace();
        }

        return new ApiResponse("친구 초대 성공", OK.value(), data);
    }

    @Override
    public ApiResponse<GetDetailChannelMemberResponseDto> getDetailChannelMember(int channelIdx, int userIdx) {

        GetDetailChannelMemberResponseDto data = null;

        try{

            List<BelongChannelEntity> bchEntity = belongChannelRepository.findByChannelIdx(channelIdx);

            for(BelongChannelEntity bch : bchEntity){

                System.out.println(bch.getChannelIdx() + " / " + channelIdx+ " | "
                        + bch.getUserIdx() + " / "  + userIdx);
                if(bch.getChannelIdx() == channelIdx && bch.getUserIdx() == userIdx){

                    UserEntity userEntity = userRepository.findByUserIdx(userIdx);

                    String tier = tierRepository.findUserTierById(userIdx);
                    data = new GetDetailChannelMemberResponseDto(userEntity, tier);
                    break;
                }
            }

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("채널 멤버 상세조회 에러", 500, null);
        }

        if(data == null) return new ApiResponse("존재하지 않는 유저입니다", 500, null);

        return new ApiResponse("채널 멤버 상세조회 성공", OK.value(), data);
    }

    @Override
    public ApiResponse<GetChannelResponseDto> deleteChannelMember(int channelIdx, String userEmail) {

        GetChannelResponseDto data = null;

        try{

            ChannelEntity channelEntity = channelRepository.findByChannelIdx(channelIdx);
            Optional<UserEntity> userEntity = userRepository.findByUserEmail(userEmail);
            BelongChannelEntity belongChannelEntity = belongChannelRepository.findTopByChannelIdx(channelIdx);

            int userIdx = userEntity.get().getUserIdx();
            if (userIdx == belongChannelEntity.getUserIdx() && belongChannelEntity.getIsAdmin() == 0){
                return new ApiResponse("방장은 탈퇴할 수 없습니다.", 500, null);
            }

            belongChannelRepository.deleteByUserIdx(userIdx);

            int curNum = channelEntity.getChannelCur();

            channelEntity.setChannelCur(curNum-1);
            channelRepository.save(channelEntity);
            data = new GetChannelResponseDto(channelEntity);

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("채널 멤버 삭제 에러", 500, null);
        }
        return new ApiResponse("채널 멤버 삭제 성공", OK.value(), data);
    }
}
