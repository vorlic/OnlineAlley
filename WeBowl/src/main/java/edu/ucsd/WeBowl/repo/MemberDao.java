package edu.ucsd.WeBowl.repo;

import java.util.List;

import edu.ucsd.WeBowl.domain.Member;

public interface MemberDao
{
    public Member findById(Long id);

    public Member findByEmail(String email);

    public List<Member> findAllOrderedByName();

    public void register(Member member);
}
