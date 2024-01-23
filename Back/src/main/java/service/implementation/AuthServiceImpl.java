package service.implementation;

import service.AuthService;


@Service
public class AuthServiceImpl implements AuthService {

    @Autowired private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void signUp(SingUpRequestDto dto){

        String nickname = dto.getNickname();
        String password = dto.getPassword();
        String gender = dto.getGender();
        String birth = dto.getBirth();
        String user_email = dto.getUserEmail();
        String profile_image = dto.profileImage();

        UserEntity userEntity = new  userEntity(dto)

    }
}
