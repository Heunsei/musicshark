package org.example.back.service.implementation;

import lombok.RequiredArgsConstructor;
import org.example.back.dto.request.CommentRequestDto;
import org.example.back.dto.response.GetCommentsResponseDto;
import org.example.back.entity.CommentEntity;
import org.example.back.entity.UserEntity;
import org.example.back.repository.CommentRepository;
import org.example.back.repository.UserRepository;
import org.example.back.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    @Override
    public List<GetCommentsResponseDto> getComments(int boardIdx) {
        List<CommentEntity> dataList = commentRepository.findAllByBoardIdx(boardIdx);
        List<GetCommentsResponseDto> results = new ArrayList<>();

        for(CommentEntity data : dataList){
            GetCommentsResponseDto dto = new GetCommentsResponseDto(data);
            UserEntity writer = userRepository.findByUserIdx(data.getUserIdx());
            dto.setUserNickname(writer.getNickname());
            results.add(dto);
        }

        return results;
    }

    @Override
    public void postComment(CommentRequestDto comment) {
        System.out.println(comment);
        CommentEntity result = new CommentEntity(comment);
        int userIdx = userRepository.findByNickname(comment.getUserNickname()).getUserIdx();

        result.setUserIdx(userIdx);
        System.out.println(result);
        commentRepository.save(result);
    }


}
